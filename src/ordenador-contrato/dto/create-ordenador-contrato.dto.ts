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
  @IsNotEmpty()
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
  @IsNotEmpty()
  @IsString()
  resolucion: string;

  @ApiProperty()
  @IsNotEmpty()
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

  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @IsOptional()
  @IsDate()
  fecha_creacion?: Date;

  @IsOptional()
  @IsDate()
  fecha_modificacion?: Date;
}
