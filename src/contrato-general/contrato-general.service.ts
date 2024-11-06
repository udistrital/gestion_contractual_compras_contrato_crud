import { Injectable } from '@nestjs/common';
import { CrearContratoGeneralDto } from './dto/crear-contrato-general.dto';
import { ActualizarContratoGeneralDto } from './dto/actualizar-contrato-general.dto';
import { ContratoGeneral } from './entities/contrato-general.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryContratoGeneralDto } from './dto/query-contrato-general.dto';
import { ResponseMetadata } from '../utils/response-metadata.interface';
import { BaseCrudService } from '../shared/services/base-crud.service';

@Injectable()
export class ContratoGeneralService extends BaseCrudService<ContratoGeneral> {
  constructor(
    @InjectRepository(ContratoGeneral)
    private contratoGeneralRepository: Repository<ContratoGeneral>,
  ) {
    super(contratoGeneralRepository, 'contrato');
  }

  async findAll(
    queryParams: QueryContratoGeneralDto,
  ): Promise<[ContratoGeneral[], ResponseMetadata]> {
    return this.findAllWithFilters(queryParams);
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
}
