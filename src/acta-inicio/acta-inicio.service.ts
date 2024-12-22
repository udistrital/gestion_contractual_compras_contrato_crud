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
      usuario_id: actaInicioDto.usuario_id,
      usuario_legado: actaInicioDto.usuario_legado,
      descripcion: actaInicioDto.descripcion,
      fecha_inicio: actaInicioDto.fecha_inicio,
      fecha_fin: actaInicioDto.fecha_fin,
      contrato_general_id: actaInicioDto.contrato_general_id,
      activo: actaInicioDto.activo,
      fecha_creacion: new Date(),
      fecha_modificacion: new Date(),
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
      usuario_legado,
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

    actaInicio.usuario_id = usuario_id;
    actaInicio.usuario_legado = usuario_legado;
    actaInicio.descripcion = descripcion;
    actaInicio.fecha_inicio = fecha_inicio
      ? new Date(fecha_inicio)
      : actaInicio.fecha_inicio;
    actaInicio.fecha_fin = fecha_fin
      ? new Date(fecha_fin)
      : actaInicio.fecha_fin;
    actaInicio.contrato_general_id = contrato_general_id;
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
    actaInicio.fecha_modificacion = new Date();

    return await this.actaInicioRepository.save(actaInicio);
  }
}
