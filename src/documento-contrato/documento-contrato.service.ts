import { Injectable } from '@nestjs/common';
import { CreateDocumentoContratoDto } from './dto/create-documento-contrato.dto';
import { UpdateDocumentoContratoDto } from './dto/update-documento-contrato.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentoContrato } from './entities/documento-contrato.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DocumentoContratoService {
  constructor(
    @InjectRepository(DocumentoContrato)
    private documentoContratoRepository: Repository<DocumentoContrato>,
  ) {}

  async create(
    createDocumentoDto: CreateDocumentoContratoDto,
  ): Promise<DocumentoContrato> {
    const documento =
      this.documentoContratoRepository.create(createDocumentoDto);
    return await this.documentoContratoRepository.save(documento);
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
      where: { contrato_general_id: { id: contratoId } },
    });
  }
}
