import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
  IsDate,
  IsOptional,
} from 'class-validator';

export class CreateOrdenadorContratoDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  tercero_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  ordenador_argo_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  ordenador_sikarca_id: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  resolucion: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  documento_identidad: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  cargo_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  contrato_general_id: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  fecha_creacion?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  fecha_modificacion?: Date;
}
