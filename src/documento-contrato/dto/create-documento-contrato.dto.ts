import { IsNumber, IsBoolean, IsString, IsOptional } from 'class-validator';

export class CreateDocumentoContratoDto {
  @IsNumber()
  documentoId: number;

  @IsBoolean()
  activo: boolean;

  @IsNumber()
  contratoGeneralId: number;

  @IsString()
  @IsOptional()
  documentoEnlace: string;
}
