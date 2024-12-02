import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDocumentoContratoDto } from './dto/create-documento-contrato.dto';
import { UpdateDocumentoContratoDto } from './dto/update-documento-contrato.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentoContrato } from './entities/documento-contrato.entity';
import { Repository } from 'typeorm';
import { ContratoGeneral } from '../contrato-general/entities/contrato-general.entity';

@Injectable()
export class DocumentoContratoService {
  constructor(
    @InjectRepository(DocumentoContrato)
    private documentoContratoRepository: Repository<DocumentoContrato>,
    @InjectRepository(ContratoGeneral)
    private contratoGeneralRepository: Repository<ContratoGeneral>,
  ) {}

  async create(
    createDocumentoDto: CreateDocumentoContratoDto,
  ): Promise<DocumentoContrato> {
    const found = await this.contratoGeneralRepository.findOne({
      where: { id: createDocumentoDto.contrato_general_id },
    });

    if (!found) {
      throw new BadRequestException(
        `Error al crear el documento. El contrato general con ID ${createDocumentoDto.contrato_general_id} no existe`,
      );
    }

    const documento =
      this.documentoContratoRepository.create(createDocumentoDto);
    try {
      return await this.documentoContratoRepository.save(documento);
    } catch (error) {
      if (error.code === '23503') {
        throw new BadRequestException(
          `Error al crear el documento: El contrato general con ID ${createDocumentoDto.contrato_general_id} no existe`,
        );
      } else {
        throw new Error(`Error al crear el documento: ${error.message}`);
      }
    }
  }

  async findAll(): Promise<DocumentoContrato[]> {
    return await this.documentoContratoRepository.find();
  }

  async findOne(id: string): Promise<DocumentoContrato> {
    return await this.documentoContratoRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateDocumentoDto: UpdateDocumentoContratoDto,
  ): Promise<DocumentoContrato> {
    await this.documentoContratoRepository.update(id, updateDocumentoDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.documentoContratoRepository.delete(id);
  }

  async findByContratoId(contratoId: number): Promise<DocumentoContrato[]> {
    return await this.documentoContratoRepository.find({
      where: { contratoGeneral: { id: contratoId } },
    });
  }
}
