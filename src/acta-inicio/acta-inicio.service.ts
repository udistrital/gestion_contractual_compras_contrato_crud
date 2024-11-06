import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrearActaInicioDto } from './dto/crear-acta-inicio.dto';
import { ActaInicio } from './entities/acta-inicio-entity';
import { ActualizarActaInicioDto } from './dto/actualizar-acta-inicio.dto';
import { ContratoGeneral } from 'src/contrato-general/entities/contrato-general.entity';

@Injectable()
export class ActaInicioService {
  constructor(
    @InjectRepository(ActaInicio)
    private readonly actaInicioRepository: Repository<ActaInicio>,
    @InjectRepository(ContratoGeneral)
    private readonly contratoGeneralRepository: Repository<ContratoGeneral>,
  ) {}

  async findAll(): Promise<ActaInicio[]> {
    return this.actaInicioRepository.find();
  }

  async findOne(id: number): Promise<ActaInicio> {
    console.log('ID recibido en findOne:', id);
    const found = await this.actaInicioRepository.findOne({
      where: { id },
    });
    console.log('Resultado de la búsqueda en findOne:', found);
    if (!found) {
      throw new NotFoundException(`ActaInicio con ID "${id}" no encontrada`);
    }
    return found;
  }

  async create(actaInicioDto: CrearActaInicioDto): Promise<ActaInicio> {
    console.log('Datos recibidos para crear ActaInicio:', actaInicioDto);

    const contratoExiste = await this.contratoGeneralRepository.findOne({
      where: { id: actaInicioDto.contrato_general_id },
      select: ['id'],
    });

    if (!contratoExiste) {
      throw new NotFoundException(
        `ContratoGeneral con ID "${actaInicioDto.contrato_general_id}" no encontrado`,
      );
    }

    const newActaInicio = this.actaInicioRepository.create({
      usuarioId: actaInicioDto.usuario_id,
      usuarioLegacy: actaInicioDto.user_legacy,
      descripcion: actaInicioDto.descripcion,
      fechaInicio: actaInicioDto.fecha_inicio,
      fechaFin: actaInicioDto.fecha_fin,
      contratoGeneralId: actaInicioDto.contrato_general_id,
      activo: actaInicioDto.activo,
      fechaCreacion: new Date(),
      fechaModificacion: new Date(),
    });

    console.log('Entidad ActaInicio creada:', newActaInicio);

    return await this.actaInicioRepository.save(newActaInicio);
  }

  async update(
    id: number,
    actaInicioDto: ActualizarActaInicioDto,
  ): Promise<ActaInicio> {
    const {
      usuario_id,
      user_legacy,
      descripcion,
      fecha_inicio,
      fecha_fin,
      contrato_general_id,
      activo,
    } = actaInicioDto;

    const actaInicio = await this.actaInicioRepository.findOne({
      where: { id },
    });
    if (!actaInicio) {
      throw new NotFoundException(`ActaInicio con ID "${id}" no encontrada`);
    }

    actaInicio.usuarioId = usuario_id;
    actaInicio.usuarioLegacy = user_legacy;
    actaInicio.descripcion = descripcion;
    actaInicio.fechaInicio = fecha_inicio
      ? new Date(fecha_inicio)
      : actaInicio.fechaInicio;
    actaInicio.fechaFin = fecha_fin ? new Date(fecha_fin) : actaInicio.fechaFin;
    actaInicio.contratoGeneralId = contrato_general_id;
    actaInicio.activo = activo;

    return await this.actaInicioRepository.save(actaInicio);
  }

  async remove(id: number): Promise<ActaInicio> {
    const actaInicio = await this.actaInicioRepository.findOne({
      where: { id },
    });

    if (!actaInicio) {
      throw new NotFoundException(`ActaInicio con ID "${id}" no encontrada`);
    }

    actaInicio.activo = false;
    actaInicio.fechaModificacion = new Date();

    return await this.actaInicioRepository.save(actaInicio);
  }
}
