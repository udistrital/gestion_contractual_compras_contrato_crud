import { Repository, SelectQueryBuilder } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { BaseQueryParamsDto } from '../dto/query-params.base.dto';
import { ResponseMetadata } from '../interfaces/response-metadata.interface';

interface FieldSelectionMap {
  mainFields: Set<string>;
  relationFields: Map<string, Set<string>>;
}

interface DateRange {
  start: string;
  end: string;
}

export abstract class BaseCrudService<T> {
  protected readonly defaultLimit = 10;
  protected readonly defaultFields = [
    'id',
    'fecha_creacion',
    'fecha_modificacion',
  ];
  protected readonly dateFields = ['fecha_creacion', 'fecha_modificacion'];
  protected readonly defaultStartDate = '2024-01-01';

  protected constructor(
    protected readonly repository: Repository<T>,
    protected readonly alias: string = 'entity',
  ) {}

  protected async findAllWithFilters(
    queryParams: BaseQueryParamsDto,
  ): Promise<[T[], ResponseMetadata]> {
    try {
      const queryBuilder = this.repository.createQueryBuilder(this.alias);

      // Primero aplicamos las relaciones
      if (queryParams.include) {
        this.applyRelations(queryBuilder, queryParams.include);
      }

      // Luego aplicamos la selección de campos si existe
      if (queryParams.fields) {
        this.applyFieldSelection(queryBuilder, queryParams.fields);
      }

      // Configurar límite
      const limit = this.calculateLimit(queryParams.limit);
      const offset = queryParams.offset || 0;
      const currentPage = limit === 0 ? 1 : Math.floor(offset / limit) + 1;

      // Aplicar relaciones si se especifican
      if (queryParams.include) {
        this.applyRelations(queryBuilder, queryParams.include);
      }

      // Aplicar selección de campos
      if (queryParams.fields) {
        this.applyFieldSelection(queryBuilder, queryParams.fields);
      }

      // Aplicar filtros dinámicos (ahora con soporte para relaciones)
      if (queryParams.query) {
        await this.applyDynamicFilters(
          queryBuilder,
          queryParams.query,
          queryParams.include,
        );
      }

      // Aplicar ordenamiento
      this.applyOrdering(queryBuilder, queryParams);

      // Aplicar paginación
      if (limit > 0) {
        queryBuilder.take(limit);
      }
      if (queryParams.offset !== undefined && queryParams.offset >= 0) {
        queryBuilder.skip(queryParams.offset);
      }

      if (queryParams.include && !queryParams.fields) {
        queryParams.include.split(',').forEach((relation) => {
          const relationTrimmed = relation.trim();
          if (this.isValidRelation(relationTrimmed)) {
            queryBuilder.addSelect(`${relationTrimmed}.*`);
          }
        });
      }

      const [results, total] = await queryBuilder.getManyAndCount();
      results.forEach((entity) => this.transformSingleRelations(entity));

      const metadata = this.generateMetadata(total, limit, offset, currentPage);

      return [results, metadata];
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(
        `Error en los parámetros de consulta: ${error.message}`,
      );
    }
  }

  protected applyFieldSelection(
    queryBuilder: SelectQueryBuilder<T>,
    fields: string,
  ): void {
    if (!fields) {
      // Seleccionamos la entidad principal completa
      queryBuilder.select(`${this.alias}`);
      return;
    }

    const { mainFields, relationFields } = this.parseFieldSelection(fields);

    // Limpiamos las selecciones previas solo si hay campos específicos
    if (!mainFields.has('*')) {
      queryBuilder.select([]);
      mainFields.forEach((field) => {
        queryBuilder.addSelect(`${this.alias}.${field}`);
      });
    } else {
      queryBuilder.select(`${this.alias}`);
    }

    // Manejamos las relaciones específicas de fields
    relationFields.forEach((fields, relationName) => {
      if (fields.size === 0) {
        const metadata =
          this.repository.metadata.findRelationWithPropertyPath(relationName);
        if (metadata) {
          metadata.inverseEntityMetadata.columns.forEach((column) => {
            queryBuilder.addSelect(`${relationName}.${column.propertyName}`);
          });
        }
      } else {
        fields.forEach((field) => {
          queryBuilder.addSelect(`${relationName}.${field}`);
        });
      }
    });
  }

  protected transformSingleRelations(entity: any): void {
    if (!entity) return;

    const relations = this.repository.metadata.relations;

    relations.forEach((relation) => {
      const relationValue = entity[relation.propertyName];

      // Transformación - unwind en caso de relaciones de 1 sólo elemento.
      if (Array.isArray(relationValue) && relationValue.length === 1) {
        entity[relation.propertyName] = relationValue[0];
      }
    });
  }

  private calculateLimit(limit?: number): number {
    if (limit === 0) return 0;
    if (!limit || limit < 1) return this.defaultLimit;
    return limit;
  }

  private isValidDateString(dateStr: string): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateStr)) return false;

    const date = new Date(dateStr);
    return date instanceof Date && !isNaN(date.getTime());
  }

  private isDateRange(value: any): value is DateRange {
    if (typeof value !== 'object' || value === null) return false;

    if (!('start' in value) && !('end' in value)) return false;

    if ('start' in value && value.start !== undefined) {
      if (
        typeof value.start !== 'string' ||
        !this.isValidDateString(value.start)
      ) {
        return false;
      }
    }

    if ('end' in value && value.end !== undefined) {
      if (typeof value.end !== 'string' || !this.isValidDateString(value.end)) {
        return false;
      }
    }

    return true;
  }

  protected async applyDynamicFilters(
    queryBuilder: SelectQueryBuilder<T>,
    queryString: string,
    includes?: string,
  ): Promise<void> {
    try {
      const filters = JSON.parse(queryString);
      const relations = includes?.split(',').map((rel) => rel.trim()) || [];

      for (const [key, value] of Object.entries(filters)) {
        if (value === null || value === undefined) continue;

        const [relationName, fieldName] = key.split('.');

        if (fieldName && relations.includes(relationName)) {
          this.applyRelationFilter(
            queryBuilder,
            relationName,
            fieldName,
            value,
            key,
          );
        } else if (this.isValidField(key)) {
          if (this.dateFields.includes(key) && this.isDateRange(value)) {
            this.applyDateRangeFilter(queryBuilder, key, value);
          } else if (typeof value === 'string' && value.includes('%')) {
            queryBuilder.andWhere(`${this.alias}.${key} LIKE :${key}`, {
              [key]: value,
            });
          } else if (Array.isArray(value)) {
            queryBuilder.andWhere(`${this.alias}.${key} IN (:...${key})`, {
              [key]: value,
            });
          } else {
            queryBuilder.andWhere(`${this.alias}.${key} = :${key}`, {
              [key]: value,
            });
          }
        }
      }
    } catch (error) {
      throw new BadRequestException(
        `Error en el formato del query JSON: ${error.message}`,
      );
    }
  }

  private applyDateRangeFilter(
    queryBuilder: SelectQueryBuilder<T>,
    key: string,
    value: DateRange,
  ): void {
    const startDate = value.start || this.defaultStartDate;
    const endDate = value.end || new Date().toISOString().split('T')[0];

    if (value.start && !value.end) {
      queryBuilder.andWhere(`${this.alias}.${key} >= :${key}Start`, {
        [`${key}Start`]: startDate,
      });
    } else if (!value.start && value.end) {
      queryBuilder.andWhere(`${this.alias}.${key} <= :${key}End`, {
        [`${key}End`]: endDate,
      });
    } else {
      queryBuilder.andWhere(
        `${this.alias}.${key} BETWEEN :${key}Start AND :${key}End`,
        {
          [`${key}Start`]: startDate,
          [`${key}End`]: endDate,
        },
      );
    }
  }

  private applyRelationFilter(
    queryBuilder: SelectQueryBuilder<T>,
    relationName: string,
    fieldName: string,
    value: any,
    key: string,
  ): void {
    if (typeof value === 'string' && value.includes('%')) {
      queryBuilder.andWhere(`${relationName}.${fieldName} LIKE :${key}`, {
        [key]: value,
      });
    } else if (Array.isArray(value)) {
      queryBuilder.andWhere(`${relationName}.${fieldName} IN (:...${key})`, {
        [key]: value,
      });
    } else {
      queryBuilder.andWhere(`${relationName}.${fieldName} = :${key}`, {
        [key]: value,
      });
    }
  }

  protected applyRelations(
    queryBuilder: SelectQueryBuilder<T>,
    includes?: string,
  ): void {
    if (!includes) return;

    // Usar un Set para asegurar que cada relación se procese una sola vez
    const relations = new Set(includes.split(',').map((rel) => rel.trim()));

    // Verificar si ya existen joins para evitar duplicados
    const existingJoins = new Set(
      queryBuilder.expressionMap.joinAttributes.map((join) => join.alias.name),
    );

    relations.forEach((relation) => {
      if (this.isValidRelation(relation) && !existingJoins.has(relation)) {
        // Primero hacemos el join
        queryBuilder.leftJoin(`${this.alias}.${relation}`, relation);

        // Seleccionamos todos los campos si no hay fields específicos
        if (
          !queryBuilder.expressionMap.selects.length ||
          queryBuilder.expressionMap.selects.some(
            (select) => select.selection === this.alias,
          )
        ) {
          const metadata =
            this.repository.metadata.findRelationWithPropertyPath(relation);
          if (metadata) {
            // Seleccionamos explícitamente todos los campos de la relación
            metadata.inverseEntityMetadata.columns.forEach((column) => {
              queryBuilder.addSelect(`${relation}.${column.propertyName}`);
            });
          }
        }
      }
    });
  }

  protected isValidRelation(relation: string): boolean {
    const metadata = this.repository.metadata;
    return metadata.relations.some((rel) => rel.propertyName === relation);
  }

  protected applyOrdering(
    queryBuilder: SelectQueryBuilder<T>,
    queryParams: BaseQueryParamsDto,
  ): void {
    const orderDirection =
      queryParams.orderBy?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    if (queryParams.sortBy && this.isValidField(queryParams.sortBy)) {
      queryBuilder.orderBy(
        `${this.alias}.${queryParams.sortBy}`,
        orderDirection,
      );
      if (queryParams.sortBy !== 'id') {
        queryBuilder.addOrderBy(`${this.alias}.id`, orderDirection);
      }
    } else {
      queryBuilder.orderBy(`${this.alias}.id`, orderDirection);
    }
  }

  protected isValidField(field: string): boolean {
    const metadata = this.repository.metadata;
    const columnNames = metadata.columns.map((column) => column.propertyName);
    return columnNames.includes(field);
  }

  private generateMetadata(
    total: number,
    limit: number,
    offset: number,
    currentPage: number,
  ): ResponseMetadata {
    const totalPages = limit === 0 ? 1 : Math.ceil(total / limit);

    return {
      total,
      limit,
      offset,
      currentPage,
      totalPages,
      hasNextPage: limit === 0 ? false : currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    };
  }

  protected parseFieldSelection(fields: string): FieldSelectionMap {
    const mainFields = new Set<string>();
    const relationFields = new Map<string, Set<string>>();

    if (!fields) {
      return { mainFields: new Set(['*']), relationFields };
    }

    const fieldArray = fields.split(',').map((field) => field.trim());

    fieldArray.forEach((field) => {
      const [relation, relationField] = field.split('.');

      if (!relationField) {
        // Es un campo de la entidad principal o el nombre de una relación
        if (this.isValidField(relation) || relation === '*') {
          mainFields.add(relation);
        } else if (this.isValidRelation(relation)) {
          // Si solo se especifica la relación, no agregamos campos específicos
          // lo que indicará que se deben seleccionar todos
          relationFields.set(relation, new Set());
        }
      } else {
        // Es un campo de una relación
        if (this.isValidRelation(relation)) {
          if (!relationFields.has(relation)) {
            relationFields.set(relation, new Set());
          }
          relationFields.get(relation).add(relationField);
        }
      }
    });

    // Siempre incluir los campos por defecto en la entidad principal
    this.defaultFields.forEach((field) => mainFields.add(field));

    return { mainFields, relationFields };
  }
}
