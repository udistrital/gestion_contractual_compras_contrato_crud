import { 
    IsBoolean,
    IsDate,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class CrearEspecificacionTecnicaDto {
    @ApiProperty({
      example: 'Item001',
      description: 'Identificador del ítem en la especificación técnica',
    })
    @IsString()
    item: string;
  
    @ApiProperty({
      example: 'Descripción detallada de la especificación',
      description: 'Especificación del ítem',
    })
    @IsString()
    especificacion: string;
  
    @ApiProperty({
      example: 'Esta es una descripción completa del ítem',
      description: 'Descripción del ítem',
    })
    @IsString()
    descripcion: string;
  
    @ApiProperty({
      example: 100,
      description: 'Cantidad del ítem',
    })
    @IsNumber()
    cantidad: number;
  
    @ApiProperty({
      example: 5000.50,
      description: 'Valor unitario del ítem',
    })
    @IsNumber()
    valorUnitario: number;
  
    @ApiProperty({
      example: 500050,
      description: 'Valor total del ítem (cantidad * valorUnitario)',
    })
    @IsNumber()
    valorTotal: number;
  
    @ApiProperty({
      example: 1,
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
      example: '2023-01-01T00:00:00Z',
      description: 'Fecha de creación del registro',
    })
    @IsOptional()
    @IsDate()
    fechaCreacion: Date;
  
    @ApiProperty({
      example: '2023-01-01T00:00:00Z',
      description: 'Fecha de última modificación del registro',
    })
    @IsOptional()
    @IsDate()
    fechaModificacion: Date;
  }
  