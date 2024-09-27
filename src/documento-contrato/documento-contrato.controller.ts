import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocumentoContratoService } from './documento-contrato.service';
import { CreateDocumentoContratoDto } from './dto/create-documento-contrato.dto';
import { UpdateDocumentoContratoDto } from './dto/update-documento-contrato.dto';
import {DocumentoResponseDto} from "./dto/documento-response.dto";
import {DocumentoContrato} from "./entities/documento-contrato.entity";

@Controller('documentos-contratos')
export class DocumentoContratoController {
  constructor(private readonly documentoContratoService: DocumentoContratoService) {}

  @Post()
  async create(@Body() createDocumentoDto: CreateDocumentoContratoDto): Promise<DocumentoContrato> {
    return this.documentoContratoService.create(createDocumentoDto);
  }

  @Get()
  async findAll(): Promise<DocumentoContrato[]> {
    return this.documentoContratoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DocumentoContrato> {
    return this.documentoContratoService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDocumentoDto: UpdateDocumentoContratoDto): Promise<DocumentoContrato> {
    return this.documentoContratoService.update(id, updateDocumentoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.documentoContratoService.remove(id);
  }

  @Get('contrato/:contratoId')
  findByContratoId(@Param('contratoId') contratoId: string) {
    return this.documentoContratoService.findByContratoId(+contratoId);
  }
}
