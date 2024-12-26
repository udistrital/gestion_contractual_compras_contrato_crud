import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateEstadoContratoDto {
  @IsNotEmpty()
  @IsNumber()
  contrato_general_id: number;

  @IsNotEmpty()
  @IsNumber()
  usuario_id: number;

  @IsNotEmpty()
  @IsString()
  usuario_rol: string;

  @IsNotEmpty()
  @IsNumber()
  estado_parametro_id: number;

  @IsNotEmpty()
  @IsNumber()
  estado_interno_parametro_id: number;

  @IsOptional()
  @IsString()
  motivo: string;

  @ApiProperty({
    example: true,
    description: 'Indica si el registro está activo o no',
  })
  @IsOptional()
  @IsBoolean()
  activo: boolean;

  @ApiProperty({
    example: '2024-01-04T00:00:00Z',
    description: 'Fecha de creación del registro',
  })
  @IsOptional()
  @IsDate()
  fecha_creacion: Date;

  @ApiProperty({
    example: '2024-01-04T00:00:00Z',
    description: 'Fecha de última modificación del registro',
  })
  @IsOptional()
  @IsDate()
  fecha_modificacion: Date;
}
