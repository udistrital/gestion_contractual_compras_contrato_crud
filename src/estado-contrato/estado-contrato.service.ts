import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EstadoContrato } from './entities/estado-contrato.entity';
import { ContratoGeneral } from '../contrato-general/entities/contrato-general.entity';
import { CreateEstadoContratoDto } from './dto/create-estado-contrato.dto';
import { UpdateEstadoContratoDto } from './dto/update-estado-contrato.dto';

@Injectable()
export class EstadoContratoService {
  constructor(
    @InjectRepository(EstadoContrato)
    private estadoContratoRepository: Repository<EstadoContrato>,
    @InjectRepository(ContratoGeneral)
    private contratoGeneralRepository: Repository<ContratoGeneral>,
  ) {}

  async create(
    createEstadoContratoDto: CreateEstadoContratoDto,
  ): Promise<EstadoContrato> {
    const { contrato_general_id, ...estadoContratoData } =
      createEstadoContratoDto;

    const contratoGeneral = await this.contratoGeneralRepository.findOne({
      where: { id: contrato_general_id },
    });

    if (!contratoGeneral) {
      throw new NotFoundException(
        `ContratoGeneral with ID ${contrato_general_id} not found`,
      );
    }

    const estadoContrato =
      this.estadoContratoRepository.create(estadoContratoData);
    estadoContrato.contrato_general_id = contratoGeneral;

    return await this.estadoContratoRepository.save(estadoContrato);
  }

  async findAll(): Promise<EstadoContrato[]> {
    return await this.estadoContratoRepository.find({
    });
  }

  async findOne(id: number): Promise<EstadoContrato> {
    const estadoContrato = await this.estadoContratoRepository.findOne({
      where: { id },
    });
    if (!estadoContrato) {
      throw new NotFoundException(`EstadoContrato with ID ${id} not found`);
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
          `ContratoGeneral with ID ${updateEstadoContratoDto.contrato_general_id} not found`,
        );
      }
      estadoContrato.contrato_general_id = contratoGeneral;
      delete updateEstadoContratoDto.contrato_general_id;
    }

    Object.assign(estadoContrato, updateEstadoContratoDto);

    return await this.estadoContratoRepository.save(estadoContrato);
  }

  async remove(id: number): Promise<void> {
    const result = await this.estadoContratoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`EstadoContrato with ID ${id} not found`);
    }
  }

  async findByContratoGeneral(
    contratoGeneralId: number,
  ): Promise<EstadoContrato[]> {
    return await this.estadoContratoRepository.find({
      where: { contrato_general_id: { id: contratoGeneralId } },
      order: { fecha_ejecucion_estado: 'DESC' },
    });
  }

  async findCurrentEstado(contratoGeneralId: number): Promise<EstadoContrato> {
    const currentEstado = await this.estadoContratoRepository.findOne({
      where: { contrato_general_id: { id: contratoGeneralId }, activo: true },
      order: { fecha_ejecucion_estado: 'DESC' },
    });

    if (!currentEstado) {
      throw new NotFoundException(
        `No active EstadoContrato found for ContratoGeneral with ID ${contratoGeneralId}`,
      );
    }

    return currentEstado;
  }
}
