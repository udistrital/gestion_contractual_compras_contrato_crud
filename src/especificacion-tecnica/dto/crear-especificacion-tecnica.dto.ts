import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearEspecificacionTecnicaDto {
  @ApiProperty({
    example: '1',
    description: 'Identificador del ítem en la especificación técnica',
  })

  @ApiProperty({
    example: 'Especificación 1',
    description: 'Descripción del ítem',
  })
  @IsString()
  descripcion: string;

  @ApiProperty({
    example: 10,
    description: 'Cantidad del ítem',
  })
  @IsNumber()
  cantidad: number;

  @ApiProperty({
    example: 100,
    description: 'Valor unitario del ítem',
  })
  @IsNumber()
  valorUnitario: number;

  @ApiProperty({
    example: 1000,
    description: 'Valor total del ítem (cantidad * valorUnitario)',
  })
  @IsNumber()
  valorTotal: number;

  @ApiProperty({
    example: 2,
    description: 'ID del contrato general relacionado',
  })
  @IsOptional()
  @IsNumber()
  contratoGeneralId: number;

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
  fechaCreacion: Date;

  @ApiProperty({
    example: '2024-01-04T00:00:00Z',
    description: 'Fecha de última modificación del registro',
  })
  @IsOptional()
  @IsDate()
  fechaModificacion: Date;
}
