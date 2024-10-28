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
    @InjectRepository(ContratoGeneral) // Asegúrate de inyectar aquí el repositorio de ContratoGeneral
    private readonly contratoGeneralRepository: Repository<ContratoGeneral>,
  ) { }

  // Obtener todas las actas de inicio
  async findAll(): Promise<ActaInicio[]> {
    return this.actaInicioRepository.find();
  }

  // Obtener una acta de inicio por su ID
  async findOne(id: number): Promise<ActaInicio> {
    console.log('ID recibido en findOne:', id); // Log del ID recibido
    const found = await this.actaInicioRepository.findOne({
      where: { id },
    });
    console.log('Resultado de la búsqueda en findOne:', found); // Log del resultado de búsqueda
    if (!found) {
      throw new NotFoundException(`ActaInicio con ID "${id}" no encontrada`);
    }
    return found;
  }

  async create(actaInicioDto: CrearActaInicioDto): Promise<ActaInicio> {
    console.log("Datos recibidos para crear ActaInicio:", actaInicioDto);

    const contratoExiste = await this.contratoGeneralRepository.findOne({
      where: { id: actaInicioDto.contrato_general_id },
      select: ["id"],
    });

    if (!contratoExiste) {
      throw new NotFoundException(`ContratoGeneral con ID "${actaInicioDto.contrato_general_id}" no encontrado`);
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

    console.log("Entidad ActaInicio creada:", newActaInicio);

    return await this.actaInicioRepository.save(newActaInicio);
  }

  // Actualizar una acta de inicio existente
  async update(id: number, actaInicioDto: ActualizarActaInicioDto): Promise<ActaInicio> {
    const { usuario_id, user_legacy, descripcion, fecha_inicio, fecha_fin, contrato_general_id, activo } = actaInicioDto;
  
    const actaInicio = await this.actaInicioRepository.findOne({ where: { id } });
    if (!actaInicio) {
      throw new NotFoundException(`ActaInicio con ID "${id}" no encontrada`);
    }
  
    // Asignar los valores desde el DTO a la entidad, con conversión de fechas
    actaInicio.usuarioId = usuario_id;
    actaInicio.usuarioLegacy = user_legacy;
    actaInicio.descripcion = descripcion;
    actaInicio.fechaInicio = fecha_inicio ? new Date(fecha_inicio) : actaInicio.fechaInicio; // Conversión de string a Date
    actaInicio.fechaFin = fecha_fin ? new Date(fecha_fin) : actaInicio.fechaFin; // Conversión de string a Date
    actaInicio.contratoGeneralId = contrato_general_id;
    actaInicio.activo = activo;
  
    return await this.actaInicioRepository.save(actaInicio);
  }   

  // Eliminar (marcar como inactiva) una acta de inicio
  async remove(id: number): Promise<void> {
    console.log('ID recibido en remove:', id); // Log del ID recibido

    const acta = await this.findOne(id);
    console.log('Resultado de la búsqueda en remove:', acta); // Log del resultado antes de marcar como inactivo

    const currentDate = new Date();
    await this.actaInicioRepository.update(id, {
      activo: false,
      fechaModificacion: currentDate,
    });
    console.log(`ActaInicio con ID ${id} marcada como inactiva`); // Confirmación de eliminación lógica
  }

}
