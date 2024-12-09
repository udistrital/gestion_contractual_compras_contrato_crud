import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrdenadorContratoDto } from './dto/create-ordenador-contrato.dto';
import { UpdateOrdenadorContratoDto } from './dto/update-ordenador-contrato.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdenadorContrato } from './entities/ordenador-contrato.entity';
import { Repository } from 'typeorm';
import { ContratoGeneral } from 'src/contrato-general/entities/contrato-general.entity';

@Injectable()
export class OrdenadorContratoService {
  constructor(
    @InjectRepository(OrdenadorContrato)
    private readonly ordenadorRepository: Repository<OrdenadorContrato>,
    @InjectRepository(ContratoGeneral)
    private readonly contratoGeneralRepository: Repository<ContratoGeneral>,
  ) { }

  async findAll(): Promise<OrdenadorContrato[]> {
    return this.ordenadorRepository.find();
  }

  async findOne(id: number): Promise<OrdenadorContrato> {
    console.log('ID recibido en findOne:', id);
    const found = await this.ordenadorRepository.findOne({
      where: { id },
    });
    console.log('Resultado de la búsqueda en finsOne:', found);
    if (!found) {
      throw new NotFoundException(`Ordenador con ID "${id}" no encontrado`);
    }
    return found;
  }

  async create(createOrdenadorContratoDto: CreateOrdenadorContratoDto): Promise<OrdenadorContrato> {
    console.log('Datos recibidos para crear Ordenador:', createOrdenadorContratoDto);
    const contratoExiste = await this.contratoGeneralRepository.findOne({
      where: { id: createOrdenadorContratoDto.contrato_general_id },
      select: ['id'],
    });
    if (!contratoExiste) {
      throw new NotFoundException(
        `ContratoGeneral con ID "${createOrdenadorContratoDto.contrato_general_id}" no encontrado`,
      );
    }
    const newOrdenador = this.ordenadorRepository.create({
      terceroId: createOrdenadorContratoDto.terceroId,
      ordenadorArgoId: createOrdenadorContratoDto.ordenadorArgoId,
      ordenadorSikarcaId: createOrdenadorContratoDto.ordenadorSikarcaId,
      resolucion: createOrdenadorContratoDto.resolucion,
      documentoIdentidad: createOrdenadorContratoDto.documentoIdentidad,
      cargoId: createOrdenadorContratoDto.cargoId,
      contrato_general_id: createOrdenadorContratoDto.contrato_general_id,
      activo: createOrdenadorContratoDto.activo,
      fecha_creacion: new Date(),
      fecha_modificacion: new Date(),
    });

    console.log('Entidad Ordenador creada:', newOrdenador);
    return await this.ordenadorRepository.save(newOrdenador);
  }

  async update(id: number, updateOrdenadorContratoDto: UpdateOrdenadorContratoDto): Promise<OrdenadorContrato> {
    const {
      terceroId,
      ordenadorArgoId,
      ordenadorSikarcaId,
      resolucion,
      documentoIdentidad,
      cargoId,
      contrato_general_id,
      activo,
    } = updateOrdenadorContratoDto;
    const ordenador = await this.ordenadorRepository.findOne({
      where: { id },
    });
    if (!ordenador) {
      throw new NotFoundException(`Ordenador con ID "${id}" no encontrado`);
    }

    ordenador.terceroId = terceroId;
    ordenador.ordenadorArgoId = ordenadorArgoId ;
    ordenador.ordenadorSikarcaId = ordenadorSikarcaId;
    ordenador.resolucion = resolucion;
    ordenador.documentoIdentidad = documentoIdentidad;
    ordenador.cargoId = cargoId;
    ordenador.contrato_general_id = contrato_general_id;
    ordenador.activo = activo;

    return await this.ordenadorRepository.save(ordenador);
  }

  async remove(id: number): Promise<OrdenadorContrato> {
    const ordenador = await this.ordenadorRepository.findOne({
      where: { id },
    });
    if(!ordenador){
      throw new NotFoundException(`Ordenador con ID "${id}" no encontrada`);
    }

    ordenador.activo = false;
    ordenador.fecha_modificacion = new Date();

    return await this.ordenadorRepository.save(ordenador);
  }
}
