import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contratista } from './entities/contratista.entity';
import { CreateContratistaDto } from './dto/create-contratista.dto';
import { UpdateContratistaDto } from './dto/update-contratista.dto';

@Injectable()
export class ContratistaService {
  constructor(
    @InjectRepository(Contratista)
    private contratistaRepository: Repository<Contratista>,
  ) {}

  async create(
    createContratistaDto: CreateContratistaDto,
  ): Promise<Contratista> {
    const contratista = this.contratistaRepository.create(createContratistaDto);
    return await this.contratistaRepository.save(contratista);
  }

  async findAll(): Promise<Contratista[]> {
    return await this.contratistaRepository.find({
    });
  }

  async findOne(id: string): Promise<Contratista> {
    const contratista = await this.contratistaRepository.findOne({
      where: { id },
    });
    if (!contratista) {
      throw new NotFoundException(`Contratista with ID "${id}" not found`);
    }
    return contratista;
  }

  async update(
    id: string,
    updateContratistaDto: UpdateContratistaDto,
  ): Promise<Contratista> {
    const contratista = await this.findOne(id);
    Object.assign(contratista, updateContratistaDto);
    return await this.contratistaRepository.save(contratista);
  }

  async remove(id: string): Promise<void> {
    const result = await this.contratistaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Contratista with ID "${id}" not found`);
    }
  }


  async findByContratoGeneralId(contratoGeneralId: number): Promise<Contratista> {
    const contratista = await this.contratistaRepository.findOne({
      where: { contrato_general: { id: contratoGeneralId } },
    });

    if (!contratista) {
      throw new NotFoundException(
        `Contratista not found for contrato_general with ID "${contratoGeneralId}"`,
      );
    }

    return contratista;
  }
}
