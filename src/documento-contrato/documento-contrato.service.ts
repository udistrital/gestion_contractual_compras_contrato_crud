import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDocumentoContratoDto } from './dto/create-documento-contrato.dto';
import { UpdateDocumentoContratoDto } from './dto/update-documento-contrato.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentoContrato } from './entities/documento-contrato.entity';
import { Repository } from 'typeorm';
import { ContratoGeneral } from '../contrato-general/entities/contrato-general.entity';
import { BaseCrudService } from 'src/shared/services/base-crud.service';
import { ResponseMetadata } from 'src/utils/response-metadata.interface';
import { BaseQueryParamsDto } from 'src/shared/dto/query-params.base.dto';

@Injectable()
export class DocumentoContratoService extends BaseCrudService<DocumentoContrato> {
  constructor(
    @InjectRepository(DocumentoContrato)
    private documentoContratoRepository: Repository<DocumentoContrato>,
    @InjectRepository(ContratoGeneral)
    private contratoGeneralRepository: Repository<ContratoGeneral>,
  ) {
    super(documentoContratoRepository);
  }

  async create(
    createDocumentoDto: CreateDocumentoContratoDto,
  ): Promise<DocumentoContrato> {
    // Validar que existe el contrato general
    const contratoGeneral = await this.contratoGeneralRepository.findOne({
      where: { id: createDocumentoDto.contrato_general_id },
    });
    if (!contratoGeneral) {
      throw new BadRequestException(
        `Error al crear el documento. El contrato general con ID ${createDocumentoDto.contrato_general_id} no existe`,
      );
    }

    // Buscar el documento actual por tipo de documento
    const documentoActual = await this.documentoContratoRepository.findOne({
      where: {
        contrato_general: { id: createDocumentoDto.contrato_general_id },
        tipo_documento_id: createDocumentoDto.tipo_documento_id,
        actual: true,
      },
    });

    // Crear el nuevo documento
    const documento = this.documentoContratoRepository.create({
      ...createDocumentoDto,
      contrato_general: contratoGeneral,
      actual: true,
    });

    if (documentoActual) {
      documentoActual.actual = false;
      await this.documentoContratoRepository.save(documentoActual);
    }
    
    return await this.documentoContratoRepository.save(documento);
  }

  async findAll(
    queryParams: BaseQueryParamsDto,
  ): Promise<[DocumentoContrato[], ResponseMetadata]> {
    return this.findAllWithFilters(queryParams);
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

  async findByContratoId(
    contratoId: number,
    tipoDocumentoId?: number,
  ): Promise<DocumentoContrato[]> {
    const condicion: any = { contrato_general: { id: contratoId } };

    if (tipoDocumentoId) {
      condicion.tipo_documento_id = tipoDocumentoId;
    }

    return await this.documentoContratoRepository.find({
      where: condicion,
      order: { fecha_creacion: 'DESC' },
    });
  }

  async findCurrentDocumento(
    contratoGeneralId: number,
    tipoDocumentoId?: number,
  ): Promise<DocumentoContrato[] | DocumentoContrato> {
    const condicion: any = {
      contrato_general: { id: contratoGeneralId },
      actual: true,
      activo: true,
    };

    if (tipoDocumentoId) {
      condicion.tipo_documento_id = tipoDocumentoId;

      return await this.documentoContratoRepository.findOne({
        where: condicion,
        order: { fecha_creacion: 'DESC' },
      });
    }

    return await this.documentoContratoRepository.find({
      where: condicion,
      order: { fecha_creacion: 'DESC' },
    });
  }
}
