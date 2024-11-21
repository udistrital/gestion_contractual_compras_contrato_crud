import { Repository, SelectQueryBuilder } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { BaseQueryParamsDto } from '../dto/query-params.base.dto';
import { ResponseMetadata } from '../interfaces/response-metadata.interface';

export abstract class BaseCrudService<T> {
  protected readonly defaultLimit = 10;
  protected readonly defaultFields = [
    'id',
    'fechaCreacion',
    'fechaModificacion',
  ];

  protected constructor(
    protected readonly repository: Repository<T>,
    protected readonly alias: string = 'entity',
  ) {}

  protected async findAllWithFilters(
    queryParams: BaseQueryParamsDto,
  ): Promise<[T[], ResponseMetadata]> {
    try {
      const queryBuilder = this.repository.createQueryBuilder(this.alias);

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

      const [results, total] = await queryBuilder.getManyAndCount();

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

  private calculateLimit(limit?: number): number {
    if (limit === 0) return 0;
    if (!limit || limit < 1) return this.defaultLimit;
    return limit;
  }

  protected applyFieldSelection(
    queryBuilder: SelectQueryBuilder<T>,
    fields: string,
  ): void {
    const selectedFields = this.getSelectedFields(fields);
    if (!selectedFields.includes('*')) {
      queryBuilder.select([`${this.alias}.id`]);
      selectedFields
        .filter((field) => field !== 'id')
        .forEach((field) => {
          queryBuilder.addSelect(`${this.alias}.${field}`);
        });
    }
  }

  protected getSelectedFields(fields?: string): string[] {
    if (!fields) return ['*'];

    const fieldArray = fields.split(',').map((field) => field.trim());
    const validFields = fieldArray.filter((field) => this.isValidField(field));

    if (validFields.length === 0) return ['*'];

    return [...new Set([...this.defaultFields, ...validFields])];
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

        // Verifica si el filtro es para un campo de una relación
        const [relationName, fieldName] = key.split('.');

        if (fieldName && relations.includes(relationName)) {
          // Es un filtro para un campo de una relación
          if (typeof value === 'string' && value.includes('%')) {
            queryBuilder.andWhere(`${relationName}.${fieldName} LIKE :${key}`, {
              [key]: value,
            });
          } else if (Array.isArray(value)) {
            queryBuilder.andWhere(
              `${relationName}.${fieldName} IN (:...${key})`,
              {
                [key]: value,
              },
            );
          } else {
            queryBuilder.andWhere(`${relationName}.${fieldName} = :${key}`, {
              [key]: value,
            });
          }
        } else if (this.isValidField(key)) {
          // Es un filtro para un campo directo de la entidad
          if (typeof value === 'string' && value.includes('%')) {
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

  protected applyRelations(
    queryBuilder: SelectQueryBuilder<T>,
    includes?: string,
  ): void {
    if (!includes) return;

    const relations = includes.split(',').map((rel) => rel.trim());

    relations.forEach((relation) => {
      if (this.isValidRelation(relation)) {
        queryBuilder.leftJoinAndSelect(`${this.alias}.${relation}`, relation);
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
}
