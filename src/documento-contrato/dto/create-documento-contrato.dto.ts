import { IsNumber, IsBoolean } from 'class-validator';

export class CreateDocumentoContratoDto {
  @IsNumber()
  documentoId: number;

  @IsBoolean()
  activo: boolean;

  @IsNumber()
  contratoGeneralId: number;
}
