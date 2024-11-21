import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrearContratoGeneralDto } from './dto/crear-contrato-general.dto';
import { ActualizarContratoGeneralDto } from './dto/actualizar-contrato-general.dto';
import { ContratoGeneral } from './entities/contrato-general.entity';
import { ResponseMetadata } from '../utils/response-metadata.interface';
import { BaseCrudService } from '../shared/services/base-crud.service';
import { BaseQueryParamsDto } from '../shared/dto/query-params.base.dto';

@Injectable()
export class ContratoGeneralService extends BaseCrudService<ContratoGeneral> {
  constructor(
    @InjectRepository(ContratoGeneral)
    private contratoGeneralRepository: Repository<ContratoGeneral>,
  ) {
    super(contratoGeneralRepository, 'contrato');
  }

  async findAll(
    queryParams: BaseQueryParamsDto,
  ): Promise<[ContratoGeneral[], ResponseMetadata]> {
    return this.findAllWithFilters(queryParams);
  }

  async findOne(
    id: number,
    queryParams?: BaseQueryParamsDto,
  ): Promise<ContratoGeneral> {
    try {
      const queryBuilder = this.contratoGeneralRepository.createQueryBuilder(
        this.alias,
      );

      if (queryParams?.include) {
        this.applyRelations(queryBuilder, queryParams.include);
      }

      queryBuilder.where(`${this.alias}.id = :id`, { id });

      const found = await queryBuilder.getOne();

      if (!found) {
        throw new NotFoundException(
          `ContratoGeneral con ID "${id}" no encontrado`,
        );
      }

      return found;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Error al buscar el contrato general: ${error.message}`);
    }
  }

  async create(
    contratoGeneral: CrearContratoGeneralDto,
  ): Promise<ContratoGeneral> {
    try {
      const newContratoGeneral = this.contratoGeneralRepository.create({
        ...contratoGeneral,
        activo: true,
      });
      return await this.contratoGeneralRepository.save(newContratoGeneral);
    } catch (error) {
      throw new Error(`Error al crear el contrato general: ${error.message}`);
    }
  }

  async update(
    id: number,
    contratoGeneral: ActualizarContratoGeneralDto,
  ): Promise<ContratoGeneral> {
    try {
      await this.findOne(id);
      await this.contratoGeneralRepository.update(id, {
        ...contratoGeneral,
        fechaModificacion: new Date(),
      });
      return this.findOne(id);
    } catch (error) {
      throw new Error(
        `Error al actualizar el contrato general: ${error.message}`,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const found = await this.findOne(id);
      if (!found) {
        throw new NotFoundException(
          `ContratoGeneral con ID "${id}" no encontrado`,
        );
      }

      await this.contratoGeneralRepository.update(id, {
        activo: false,
        fechaModificacion: new Date(),
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(
        `Error al eliminar el contrato general: ${error.message}`,
      );
    }
  }
}
