import { IsNumber, IsBoolean, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentoContratoDto {
  @ApiProperty({
    example: 1,
    description: 'Documento ID - Gestor Documental',
  })
  @IsNumber()
  documento_id: number;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @ApiProperty({
    example: 1,
    description: 'ID Contrato General Asociado',
  })
  @IsNumber()
  contrato_general_id: number;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Enlace al documento',
  })
  @IsString()
  @IsOptional()
  documento_enlace: string;

  @ApiProperty({
    example: 1,
    required: false,
    description: 'ID Tipo Documento - Parámetros CRUD',
  })
  @IsNumber()
  @IsOptional()
  tipo_documento_id: number;
}
