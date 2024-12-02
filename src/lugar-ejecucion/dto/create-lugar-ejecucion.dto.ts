import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
  IsDate,
  IsOptional,
} from 'class-validator';

export class CreateLugarEjecucionDto {
  @IsNotEmpty()
  @IsNumber()
  paisId: number;

  @IsNotEmpty()
  @IsNumber()
  ciudadId: number;

  @IsNotEmpty()
  @IsNumber()
  municipioId: number;

  @IsNotEmpty()
  @IsNumber()
  dependenciaId: number;

  @IsNotEmpty()
  @IsNumber()
  sedeId: number;

  @IsNotEmpty()
  @IsString()
  direccion: string;

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
