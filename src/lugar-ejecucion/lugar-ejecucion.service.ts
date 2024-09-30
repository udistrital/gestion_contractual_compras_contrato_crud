import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LugarEjecucion } from './entities/lugar-ejecucion.entity';
import { ContratoGeneral } from '../contrato-general/entities/contrato-general.entity';
import { CreateLugarEjecucionDto } from './dto/create-lugar-ejecucion.dto';
import { UpdateLugarEjecucionDto } from './dto/update-lugar-ejecucion.dto';

@Injectable()
export class LugarEjecucionService {
  constructor(
    @InjectRepository(LugarEjecucion)
    private lugarEjecucionRepository: Repository<LugarEjecucion>,
    @InjectRepository(ContratoGeneral)
    private contratoGeneralRepository: Repository<ContratoGeneral>,
  ) {}

  async create(
    createLugarEjecucionDto: CreateLugarEjecucionDto,
  ): Promise<LugarEjecucion> {
    const { contrato_general_id, ...lugarEjecucionData } =
      createLugarEjecucionDto;

    const contratoGeneral = await this.contratoGeneralRepository.findOne({
      where: { id: contrato_general_id },
    });

    if (!contratoGeneral) {
      throw new NotFoundException(
        `ContratoGeneral with ID ${contrato_general_id} not found`,
      );
    }

    const lugarEjecucion =
      this.lugarEjecucionRepository.create(lugarEjecucionData);
    lugarEjecucion.contrato_general_id = contratoGeneral;

    return await this.lugarEjecucionRepository.save(lugarEjecucion);
  }

  async findAll(): Promise<LugarEjecucion[]> {
    return await this.lugarEjecucionRepository.find({});
  }

  async findOne(id: number): Promise<LugarEjecucion> {
    const lugarEjecucion = await this.lugarEjecucionRepository.findOne({
      where: { id },
    });
    if (!lugarEjecucion) {
      throw new NotFoundException(`LugarEjecucion with ID ${id} not found`);
    }
    return lugarEjecucion;
  }

  async update(
    id: number,
    updateLugarEjecucionDto: UpdateLugarEjecucionDto,
  ): Promise<LugarEjecucion> {
    const lugarEjecucion = await this.findOne(id);

    if (updateLugarEjecucionDto.contrato_general_id) {
      const contratoGeneral = await this.contratoGeneralRepository.findOne({
        where: { id: updateLugarEjecucionDto.contrato_general_id },
      });
      if (!contratoGeneral) {
        throw new NotFoundException(
          `ContratoGeneral with ID ${updateLugarEjecucionDto.contrato_general_id} not found`,
        );
      }
      lugarEjecucion.contrato_general_id = contratoGeneral;
      delete updateLugarEjecucionDto.contrato_general_id;
    }

    Object.assign(lugarEjecucion, updateLugarEjecucionDto);

    return await this.lugarEjecucionRepository.save(lugarEjecucion);
  }

  async remove(id: number): Promise<void> {
    const result = await this.lugarEjecucionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`LugarEjecucion with ID ${id} not found`);
    }
  }

  async findByContratoGeneralId(
    contratoGeneralId: number,
  ): Promise<LugarEjecucion> {
    const lugarEjecucion = await this.lugarEjecucionRepository.findOne({
      where: { contrato_general_id: { id: contratoGeneralId } },
    });

    if (!lugarEjecucion) {
      throw new NotFoundException(
        `LugarEjecucion not found for ContratoGeneral with ID ${contratoGeneralId}`,
      );
    }

    return lugarEjecucion;
  }
}
