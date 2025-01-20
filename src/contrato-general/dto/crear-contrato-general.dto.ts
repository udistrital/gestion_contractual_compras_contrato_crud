import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearContratoGeneralDto {
  @ApiProperty({
    example: 1,
    description:
      'Id Parámetros CRUD: Tipo Compromiso. 1. Convenio. 2. Contrato 3. Orden',
  })
  @IsOptional()
  @IsNumber()
  tipo_compromiso_id: number;

  @ApiProperty({
    example: 1,
    description:
      'Id Parámetros CRUD: Tipo Contrato. 1. Orden de Servicio, 2. Orden de Compra',
  })
  @IsOptional()
  @IsNumber()
  tipo_contrato_id: number;

  @ApiProperty({
    example: 1,
    description:
      'Id Parámetros CRUD: Perfil Contratista. 1. Asistencial, 2. Técnico, 3. Profesional, 4. Especializado, ...',
  })
  @IsOptional()
  @IsNumber()
  perfil_contratista_id: number;

  @IsOptional()
  @IsDate()
  fecha_suscripcion_estudios: Date;

  @ApiProperty({
    example: true,
    description: 'Aplica Poliza',
  })
  @IsOptional()
  @IsBoolean()
  aplica_poliza: boolean;

  @ApiProperty({
    example: 1,
    description:
      'Id Parámetros CRUD: Modalidad Selección. 1. Licitación Pública, 2. Selección Abreviada, ...',
  })
  @IsOptional()
  @IsNumber()
  modalidad_seleccion_id: number;

  @IsOptional()
  @IsNumber()
  tipo_control_id: number;

  @ApiProperty({
    example: 30,
    description:
      'Id Parámetros CRUD: Tipología Específica. 30. Servicios de Mantenimiento y Reparación, ...',
  })
  @IsOptional()
  @IsNumber()
  tipologia_especifica_id: number;

  @ApiProperty({
    example: 1,
    description:
      'Id Parámetros CRUD: Regimen Contratación. 1. Ley 80, 2. Régimen Privado, 3. Convenio Ley 489, ...',
  })
  @IsOptional()
  @IsNumber()
  regimen_contratacion_id: number;

  @ApiProperty({
    example: 1,
    description:
      'Id Parámetros CRUD: Procedimiento. 1. Subasta Inversa, 2. Mínima Cuantía, 3. Concurso de Méritos ...',
  })
  @IsOptional()
  @IsNumber()
  procedimiento_id: number;

  @ApiProperty({
    example: 30,
    description:
      'Cantidad de días, meses o años para la ejecución del contrato',
  })
  @IsOptional()
  @IsNumber()
  plazo_ejecucion: number;

  @ApiProperty({
    example: 1,
    description:
      'Id Parámetros CRUD: Unidad de Tiempo. 1. Días, 2. Meses, 3. Años',
  })
  @IsOptional()
  @IsNumber()
  unidad_ejecucion_id: number;

  @IsOptional()
  @IsNumber()
  tipo_moneda_id: number;

  @IsOptional()
  @IsNumber()
  valor_pesos: number;

  @IsOptional()
  @IsNumber()
  tipo_gasto_id: number;

  @IsOptional()
  @IsNumber()
  origen_recursos_id: number;

  @IsOptional()
  @IsNumber()
  origen_presupuestos_id: number;

  @IsOptional()
  @IsNumber()
  tema_gasto_inversion_id: number;

  @IsOptional()
  @IsNumber()
  valor_contrato_me: number;

  @IsOptional()
  @IsNumber()
  valor_tasa_cambio: number;

  @IsOptional()
  @IsNumber()
  medio_pago_id: number;

  @IsOptional()
  @IsBoolean()
  clausula_registro_presupuestal: boolean;

  @IsOptional()
  @IsString()
  modo_pago: string;

  @IsOptional()
  @IsString()
  objeto: string;

  @IsOptional()
  @IsString()
  justificacion: string;

  @IsOptional()
  @IsString()
  actividades: string;

  @IsOptional()
  @IsString()
  condiciones: string;

  @IsOptional()
  @IsString()
  observaciones: string;

  @IsOptional()
  @IsString()
  vigencia: string;

  @IsOptional()
  @IsString()
  consecutivo_elaboracion: string;

  @IsOptional()
  @IsDate()
  fecha_inicial: Date;

  @IsOptional()
  @IsDate()
  fecha_final: Date;

  @IsOptional()
  @IsString()
  usuario_legado: string;

  @IsOptional()
  @IsString()
  numero_contrato: string;

  @IsOptional()
  @IsNumber()
  unidad_ejecutora_id: number;
}
