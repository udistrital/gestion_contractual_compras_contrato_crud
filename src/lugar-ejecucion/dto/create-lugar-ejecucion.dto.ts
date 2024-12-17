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
  pais_id: number;

  @IsNotEmpty()
  @IsNumber()
  ciudad_id: number;

  @IsNotEmpty()
  @IsNumber()
  municipio_id: number;

  @IsNotEmpty()
  @IsNumber()
  dependencia_id: number;

  @IsNotEmpty()
  @IsNumber()
  sede_id: number;

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
