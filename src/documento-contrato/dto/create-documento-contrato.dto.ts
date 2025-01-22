import {
  IsNumber,
  IsBoolean,
  IsString,
  IsOptional,
  IsDate,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDocumentoContratoDto {
  @ApiProperty({
    example: 1,
    description: 'ID del contrato general asociado',
  })
  @IsNotEmpty()
  @IsNumber()
  contrato_general_id: number;

  @ApiProperty({
    example: 1,
    description: 'ID del tipo de documento (Parámetros CRUD)',
  })
  @IsNotEmpty()
  @IsNumber()
  tipo_documento_id: number;

  @ApiProperty({
    example: 1,
    description: 'ID del usuario quien registra el documento',
  })
  @IsNotEmpty()
  @IsNumber()
  usuario_id: number;

  @ApiProperty({
    example: 'ROL',
    description: 'Rol del usuario quien registra el documento',
  })
  @IsNotEmpty()
  @IsString()
  usuario_rol: string;

  @ApiProperty({
    example: 1,
    description: 'ID del documento en el gestor documental',
  })
  @IsNotEmpty()
  @IsNumber()
  documento_id: number;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Enlace único al documento',
  })
  @IsNotEmpty()
  @IsString()
  documento_enlace: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Estado del documento (activo o inactivo)',
    readOnly: true,
  })
  activo?: boolean;

  @ApiPropertyOptional({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Fecha de creación del documento',
    readOnly: true,
  })
  fecha_creacion?: Date;

  @ApiPropertyOptional({
    example: '2023-01-02T00:00:00.000Z',
    description: 'Fecha de última modificación del documento',
    readOnly: true,
  })
  fecha_modificacion?: Date;
}
