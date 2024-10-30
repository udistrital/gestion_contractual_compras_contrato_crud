import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsBoolean,
} from 'class-validator';

export class CreateCdpDto {
  @ApiProperty({
    description: 'Número identificador del CDP',
    example: 1001,
  })
  @IsNotEmpty()
  @IsNumber()
  numero_cdp_id: number;

  @ApiProperty({
    description: 'Fecha de registro del CDP',
    example: '2023-01-15',
  })
  @IsNotEmpty()
  @IsDate()
  fecha_registro: Date;

  @ApiProperty({
    description: 'Año de vigencia del CDP',
    example: 2023,
  })
  @IsNotEmpty()
  @IsNumber()
  vigencia_cdp: number;

  @ApiProperty({
    description: 'ID del contrato general asociado',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  contrato_general_id: number;

  @ApiProperty({
    description: 'Estado activo del CDP',
    example: true,
  })

  activo: boolean;
}
