import {
    IsBoolean,
    IsDate,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class CrearActaInicioDto {
    @ApiProperty({
      example: 1,
      description: 'Id del usuario que creó el acta',
    })
    @IsOptional()
    @IsNumber()
    usuario_id: number;
  
    @ApiProperty({
      example: 'user_legacy',
      description: 'Usuario heredado del sistema anterior',
    })
    @IsOptional()
    @IsString()
    user_legacy: string;
  
    @ApiProperty({
      example: 'Descripción del acta',
      description: 'Descripción breve del acta',
    })
    @IsOptional()
    @IsString()
    descripcion: string;
  
    @ApiProperty({
      example: '2023-10-24',
      description: 'Fecha de inicio del acta',
    })
    @IsOptional()
    @IsDate()
    fecha_inicio: Date;
  
    @ApiProperty({
      example: '2023-11-24',
      description: 'Fecha de finalización del acta',
    })
    @IsOptional()
    @IsDate()
    fecha_fin: Date;
  
    @ApiProperty({
      example: 1,
      description: 'Id del contrato general relacionado',
    })
    @IsOptional()
    @IsNumber()
    contrato_general_id: number;
  
    @ApiProperty({
      example: true,
      description: 'Indica si el acta está activa',
    })
    @IsOptional()
    @IsBoolean()
    activo: boolean;
  
    @ApiProperty({
      example: '2023-10-24T10:30:00Z',
      description: 'Fecha de creación del acta',
    })
    @IsOptional()
    @IsDate()
    fecha_creacion: Date;
  
    @ApiProperty({
      example: '2023-10-25T10:30:00Z',
      description: 'Fecha de la última modificación del acta',
    })
    @IsOptional()
    @IsDate()
    fecha_modificacion: Date;
  }
  