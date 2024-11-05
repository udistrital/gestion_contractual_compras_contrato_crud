import { BadRequestException, Injectable } from '@nestjs/common';
import { CrearContratoGeneralDto } from './dto/crear-contrato-general.dto';
import { ActualizarContratoGeneralDto } from './dto/actualizar-contrato-general.dto';
import { ContratoGeneral } from './entities/contrato-general.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryContratoGeneralDto } from './dto/query-contrato-general.dto';
import { ResponseMetadata } from '../utils/response-metadata.interface';

@Injectable()
export class ContratoGeneralService {
  private readonly defaultFields = ['id', 'fechaCreacion', 'fechaModificacion'];

  constructor(
    @InjectRepository(ContratoGeneral)
    private contratoGeneralRepository: Repository<ContratoGeneral>,
  ) {}

  async findAll(
    queryParams: QueryContratoGeneralDto,
  ): Promise<[ContratoGeneral[], ResponseMetadata]> {
    try {
      const queryBuilder =
        this.contratoGeneralRepository.createQueryBuilder('contrato');

      const limit = queryParams.limit || 0;
      const offset = queryParams.offset || 0;
      const currentPage = Math.floor(offset / limit) + 1;

      if (queryParams.fields) {
        const camposSeleccionados = this.getSelectedFields(queryParams.fields);
        if (!camposSeleccionados.includes('*')) {
          camposSeleccionados.forEach((field) => {
            queryBuilder.addSelect(`contrato.${field}`);
          });
        }
      }

      if (queryParams.query) {
        await this.applyDynamicFilters(queryBuilder, queryParams.query);
      }

      if (queryParams.sortBy) {
        const order = queryParams.orderBy || 'ASC';
        if (this.isValidField(queryParams.sortBy)) {
          queryBuilder.orderBy(`contrato.${queryParams.sortBy}`, order);
        } else {
          throw new BadRequestException(
            `Campo de ordenamiento '${queryParams.sortBy}' no válido`,
          );
        }
      }

      if (queryParams.limit !== undefined && queryParams.limit > 0) {
        queryBuilder.take(queryParams.limit);
      }

      if (queryParams.offset !== undefined && queryParams.offset >= 0) {
        queryBuilder.skip(queryParams.offset);
      }

      const [results, total] = await queryBuilder.getManyAndCount();

      const totalPages = Math.ceil(total / limit);

      const metadata: ResponseMetadata = {
        total,
        limit,
        offset,
        currentPage,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      };

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

  async findOne(id: number): Promise<ContratoGeneral> {
    const found = await this.contratoGeneralRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new Error(`ContratoGeneral con ID "${id}" no encontrado`);
    }
    return found;
  }

  async create(
    contratoGeneral: CrearContratoGeneralDto,
  ): Promise<ContratoGeneral> {
    return this.contratoGeneralRepository.save(contratoGeneral);
  }

  async update(
    id: number,
    contratoGeneral: ActualizarContratoGeneralDto,
  ): Promise<ContratoGeneral> {
    await this.contratoGeneralRepository.update(id, contratoGeneral);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const found = await this.findOne(id);
    if (!found) {
      throw new Error(`ContratoGeneral con ID "${id}" no encontrado`);
    }
    const currentDate = new Date();
    await this.contratoGeneralRepository.update(id, {
      activo: false,
      fechaModificacion: currentDate,
    });
  }

  //Utils
  private getSelectedFields(fields?: string): string[] {
    if (!fields) {
      return ['*'];
    }

    const fieldArray = fields.split(',').map((field) => field.trim());
    const validFields = fieldArray.filter((field) => this.isValidField(field));

    if (validFields.length === 0) {
      return ['*'];
    }

    return [...new Set([...this.defaultFields, ...validFields])];
  }

  private async applyDynamicFilters(
    queryBuilder: SelectQueryBuilder<ContratoGeneral>,
    queryString: string,
  ): Promise<void> {
    try {
      const filters = JSON.parse(queryString);

      for (const [key, value] of Object.entries(filters)) {
        if (value !== null && value !== undefined && this.isValidField(key)) {
          if (typeof value === 'string' && value.includes('%')) {
            queryBuilder.andWhere(`contrato.${key} LIKE :${key}`, {
              [key]: value,
            });
          } else if (Array.isArray(value)) {
            queryBuilder.andWhere(`contrato.${key} IN (:...${key})`, {
              [key]: value,
            });
          } else {
            queryBuilder.andWhere(`contrato.${key} = :${key}`, {
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

  private isValidField(field: string): boolean {
    const metadata = this.contratoGeneralRepository.metadata;
    const columnNames = metadata.columns.map((column) => column.propertyName);
    return columnNames.includes(field);
  }
}
