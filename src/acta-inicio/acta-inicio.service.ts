import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrearActaInicioDto } from './dto/crear-acta-inicio.dto';
import { ActaInicio } from './entities/acta-inicio-entity';
import { ActualizarActaInicioDto } from './dto/actualizar-acta-inicio.dto';

@Injectable()
export class ActaInicioService {
  constructor(
    @InjectRepository(ActaInicio)
    private actaInicioRepository: Repository<ActaInicio>,
  ) {}

  // Obtener todas las actas de inicio
  async findAll(): Promise<ActaInicio[]> {
    return this.actaInicioRepository.find();
  }

  // Obtener una acta de inicio por su ID
  async findOne(id: number): Promise<ActaInicio> {
    const found = await this.actaInicioRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`ActaInicio con ID "${id}" no encontrada`);
    }
    return found;
  }

  // Crear una nueva acta de inicio
  async create(actaInicioDto: CrearActaInicioDto): Promise<ActaInicio> {
    const newActaInicio = this.actaInicioRepository.create(actaInicioDto);
    return this.actaInicioRepository.save(newActaInicio);
  }

  // Actualizar una acta de inicio existente
  async update(
    id: number,
    actaInicioDto: ActualizarActaInicioDto,
  ): Promise<ActaInicio> {
    await this.actaInicioRepository.update(id, actaInicioDto);
    return this.findOne(id); // Retornar el acta actualizada
  }

  // Eliminar (marcar como inactiva) una acta de inicio
  async remove(id: number): Promise<void> {
    const acta = await this.findOne(id);
    if (!acta) {
      throw new NotFoundException(`ActaInicio con ID "${id}" no encontrada`);
    }
    const currentDate = new Date();
    await this.actaInicioRepository.update(id, {
      activo: false,
      fechaModificacion: currentDate,
    });
  }
}
