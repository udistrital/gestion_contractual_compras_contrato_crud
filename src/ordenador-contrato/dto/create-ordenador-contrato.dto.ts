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
  terceroId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  ordenadorArgoId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  ordenadorSikarcaId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  resolucion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  documentoIdentidad: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  cargoId: number;

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
