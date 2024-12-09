import { PartialType } from '@nestjs/swagger';
import { CreateOrdenadorContratoDto } from './create-ordenador-contrato.dto';

export class UpdateOrdenadorContratoDto extends PartialType(CreateOrdenadorContratoDto) {}
