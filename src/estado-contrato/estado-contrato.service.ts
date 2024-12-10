import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EstadoContrato } from './entities/estado-contrato.entity';
import { ContratoGeneral } from '../contrato-general/entities/contrato-general.entity';
import { CreateEstadoContratoDto } from './dto/create-estado-contrato.dto';
import { UpdateEstadoContratoDto } from './dto/update-estado-contrato.dto';
import { BaseQueryParamsDto } from '../shared/dto/query-params.base.dto';
import { ResponseMetadata } from '../utils/response-metadata.interface';
import { BaseCrudService } from '../shared/services/base-crud.service';

@Injectable()
export class EstadoContratoService extends BaseCrudService<EstadoContrato> {
  constructor(
    @InjectRepository(EstadoContrato)
    private estadoContratoRepository: Repository<EstadoContrato>,
    @InjectRepository(ContratoGeneral)
    private contratoGeneralRepository: Repository<ContratoGeneral>,
  ) {
    super(estadoContratoRepository);
  }

  async create(
    createEstadoContratoDto: CreateEstadoContratoDto,
  ): Promise<EstadoContrato> {
    const { contrato_general_id, estado_parametro_id, ...estadoContratoData } =
      createEstadoContratoDto;

    // Validar que existe el contrato general
    const contratoGeneral = await this.contratoGeneralRepository.findOne({
      where: { id: contrato_general_id },
    });

    if (!contratoGeneral) {
      throw new NotFoundException(
        `ContratoGeneral con ID ${contrato_general_id} no encontrado`,
      );
    }

    // Buscar el estado actual activo
    const estadoActual = await this.estadoContratoRepository.findOne({
      where: {
        contrato_general: { id: contrato_general_id },
        actual: true,
      },
    });

    // Crear el nuevo estado
    const nuevoEstado = this.estadoContratoRepository.create({
      ...estadoContratoData,
      estado_parametro_id,
      contrato_general: contratoGeneral,
      actual: true,
    });

    // Si existe un estado actual, desactivarlo
    if (estadoActual) {
      estadoActual.actual = false;
      await this.estadoContratoRepository.save(estadoActual);
    }

    return await this.estadoContratoRepository.save(nuevoEstado);
  }

  async findAll(
    queryParams: BaseQueryParamsDto,
  ): Promise<[EstadoContrato[], ResponseMetadata]> {
    return this.findAllWithFilters(queryParams);
  }

  async findOne(id: number): Promise<EstadoContrato> {
    const estadoContrato = await this.estadoContratoRepository.findOne({
      where: { id },
    });
    if (!estadoContrato) {
      throw new NotFoundException(`EstadoContrato con ID ${id} no encontrado`);
    }
    return estadoContrato;
  }

  async update(
    id: number,
    updateEstadoContratoDto: UpdateEstadoContratoDto,
  ): Promise<EstadoContrato> {
    const estadoContrato = await this.findOne(id);

    if (updateEstadoContratoDto.contrato_general_id) {
      const contratoGeneral = await this.contratoGeneralRepository.findOne({
        where: { id: updateEstadoContratoDto.contrato_general_id },
      });
      if (!contratoGeneral) {
        throw new NotFoundException(
          `ContratoGeneral con ID ${updateEstadoContratoDto.contrato_general_id} no encontado`,
        );
      }
      estadoContrato.contrato_general = contratoGeneral;
      delete updateEstadoContratoDto.contrato_general_id;
    }

    Object.assign(estadoContrato, updateEstadoContratoDto);

    return await this.estadoContratoRepository.save(estadoContrato);
  }

  async remove(id: number): Promise<void> {
    const result = await this.estadoContratoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`EstadoContrato con ID ${id} no encontrado`);
    }
  }

  async findByContratoGeneral(
    contratoGeneralId: number,
  ): Promise<EstadoContrato[]> {
    return await this.estadoContratoRepository.find({
      where: { contrato_general: { id: contratoGeneralId } },
      order: { fecha_creacion: 'DESC' },
    });
  }

  async findCurrentEstado(contratoGeneralId: number): Promise<EstadoContrato> {
    const currentEstado = await this.estadoContratoRepository.findOne({
      where: { contrato_general: { id: contratoGeneralId }, activo: true },
      order: { fecha_creacion: 'DESC' },
    });

    if (!currentEstado) {
      throw new NotFoundException(
        `No active EstadoContrato found for ContratoGeneral with ID ${contratoGeneralId}`,
      );
    }

    return currentEstado;
  }
}
