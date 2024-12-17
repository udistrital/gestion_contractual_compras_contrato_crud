import {
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsDate,
  IsOptional,
} from 'class-validator';

export class CreateSupervisorDto {
  @IsNotEmpty()
  @IsNumber()
  dependenciaSolicitanteId: number;

  @IsNotEmpty()
  @IsNumber()
  sedeSolicitanteId: number;

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
