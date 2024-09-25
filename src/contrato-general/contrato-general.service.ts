import { Injectable } from '@nestjs/common';
import { CrearContratoGeneralDto } from './dto/crear-contrato-general.dto';
import { ActualizarContratoGeneralDto } from './dto/actualizar-contrato-general.dto';
import { ContratoGeneralEntity } from './entities/contrato-general.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContratoGeneralService {
  constructor(
    @InjectRepository(ContratoGeneralEntity)
    private contratoGeneralRepository: Repository<ContratoGeneralEntity>,
  ) {}

  async findAll(): Promise<ContratoGeneralEntity[]> {
    return this.contratoGeneralRepository.find();
  }

  async findOne(id: number): Promise<ContratoGeneralEntity> {
    return this.contratoGeneralRepository.findOne({ where: { id } });
  }

  async create(
    contratogeneral: CrearContratoGeneralDto,
  ): Promise<ContratoGeneralEntity> {
    return this.contratoGeneralRepository.save(contratogeneral);
  }

  async update(
    id: number,
    contratogeneral: ActualizarContratoGeneralDto,
  ): Promise<ContratoGeneralEntity> {
    await this.contratoGeneralRepository.update(id, contratogeneral);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.contratoGeneralRepository.delete(id);
  }
}
