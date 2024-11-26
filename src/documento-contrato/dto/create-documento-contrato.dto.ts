import { IsNumber, IsBoolean, IsString, IsOptional } from 'class-validator';

export class CreateDocumentoContratoDto {
  @IsNumber()
  documento_id: number;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsNumber()
  contrato_general_id: number;

  @IsString()
  @IsOptional()
  documento_enlace: string;

  @IsNumber()
  @IsOptional()
  tipo_documento_id: number;
}
