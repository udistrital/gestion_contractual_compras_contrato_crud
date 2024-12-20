import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContratistaDto {
  @ApiProperty({
    description: 'Número de documento del contratista',
    example: '1234',
  })
  @IsNotEmpty()
  @IsString()
  numero_documento: string;

  @ApiProperty({
    description: 'ID del tipo de persona del contratista',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  tipo_persona_id: number;

  @ApiProperty({
    description: 'Contrato asociado al contratista',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  contrato_general_id: number;
}
