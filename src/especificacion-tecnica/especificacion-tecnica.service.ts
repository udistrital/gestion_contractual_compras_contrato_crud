import { Injectable, NotFoundException } from '@nestjs/common';
import { CrearEspecificacionTecnicaDto } from './dto/crear-especificacion-tecnica.dto';
import { EspecificacionTecnica } from './entities/especificacion-tecnica.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ActualizarEspecificacionTecnicaDto } from './dto/actualizar-especificacion-tecnica';

@Injectable()
export class EspecificacionTecnicaService {
  constructor(
    @InjectRepository(EspecificacionTecnica)
    private especificacionTecnicaRepository: Repository<EspecificacionTecnica>,
  ) {}

  async findAll(): Promise<EspecificacionTecnica[]> {
    return this.especificacionTecnicaRepository.find();
  }

  async findOne(id: number): Promise<EspecificacionTecnica> {
    const especificacion = await this.especificacionTecnicaRepository.findOne({
      where: { id },
    });
    if (!especificacion) {
      throw new NotFoundException(`EspecificacionTecnica con ID "${id}" no encontrada`);
    }
    return especificacion;
  }

  async create(
    especificacionTecnicaDto: CrearEspecificacionTecnicaDto,
  ): Promise<EspecificacionTecnica> {
    const especificacion = this.especificacionTecnicaRepository.create(especificacionTecnicaDto);
    return this.especificacionTecnicaRepository.save(especificacion);
  }

  async update(
    id: number,
    especificacionTecnicaDto: ActualizarEspecificacionTecnicaDto,
  ): Promise<EspecificacionTecnica> {
    await this.especificacionTecnicaRepository.update(id, especificacionTecnicaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<EspecificacionTecnica> {
    const especificacion = await this.findOne(id);
    
    if (!especificacion) {
      throw new NotFoundException(`EspecificacionTecnica con ID "${id}" no encontrada`);
    }

    especificacion.activo = false;
    especificacion.fechaModificacion = new Date();

    return this.especificacionTecnicaRepository.save(especificacion);
  }
  
}
