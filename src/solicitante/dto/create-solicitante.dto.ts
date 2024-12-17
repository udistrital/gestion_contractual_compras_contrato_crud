import {
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsDate,
  IsOptional,
} from 'class-validator';

export class CreateSolicitanteDto {
  @IsNotEmpty()
  @IsNumber()
  dependencia_solicitante_id: number;

  @IsNotEmpty()
  @IsNumber()
  sede_solicitante_id: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @IsOptional()
  @IsDate()
  fecha_creacion?: Date;

  @IsOptional()
  @IsDate()
  fecha_modificacion?: Date;

  @IsNotEmpty()
  @IsNumber()
  contrato_general_id: number;
}
