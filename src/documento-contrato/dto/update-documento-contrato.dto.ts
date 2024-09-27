import { PartialType } from '@nestjs/swagger';
import { CreateDocumentoContratoDto } from './create-documento-contrato.dto';

export class UpdateDocumentoContratoDto extends PartialType(CreateDocumentoContratoDto) {}
