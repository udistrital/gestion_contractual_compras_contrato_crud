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
  tipoCompromisoId: number;

  @ApiProperty({
    example: 1,
    description:
      'Id Parámetros CRUD: Tipo Contrato. 1. Orden de Servicio, 2. Orden de Compra',
  })
  @IsOptional()
  @IsNumber()
  tipoContratoId: number;

  @ApiProperty({
    example: 1,
    description:
      'Id Parámetros CRUD: Perfil Contratista. 1. Asistencial, 2. Técnico, 3. Profesional, 4. Especializado, ...',
  })
  @IsOptional()
  @IsNumber()
  perfilContratistaId: number;

  @IsOptional()
  @IsDate()
  fechaSuscripcionEstudios: Date;

  @ApiProperty({
    example: true,
    description: 'Aplica Poliza',
  })
  @IsOptional()
  @IsBoolean()
  aplicaPoliza: boolean;

  @ApiProperty({
    example: 1,
    description:
      'Id Parámetros CRUD: Modalidad Selección. 1. Licitación Pública, 2. Selección Abreviada, ...',
  })
  @IsOptional()
  @IsNumber()
  modalidadSeleccionId: number;

  @ApiProperty({
    example: 30,
    description:
      'Id Parámetros CRUD: Tipología Específica. 30. Servicios de Mantenimiento y Reparación, ...',
  })
  @IsOptional()
  @IsNumber()
  tipologiaEspecificaId: number;

  @ApiProperty({
    example: 1,
    description:
      'Id Parámetros CRUD: Regimen Contratación. 1. Ley 80, 2. Régimen Privado, 3. Convenio Ley 489, ...',
  })
  @IsOptional()
  @IsNumber()
  regimenContratacionId: number;

  @ApiProperty({
    example: 1,
    description:
      'Id Parámetros CRUD: Procedimiento. 1. Subasta Inversa, 2. Mínima Cuantía, 3. Concurso de Méritos ...',
  })
  @IsOptional()
  @IsNumber()
  procedimientoId: number;

  @ApiProperty({
    example: 30,
    description:
      'Cantidad de días, meses o años para la ejecución del contrato',
  })
  @IsOptional()
  @IsNumber()
  plazoEjecucion: number;

  @ApiProperty({
    example: 1,
    description:
      'Id Parámetros CRUD: Unidad de Tiempo. 1. Días, 2. Meses, 3. Años',
  })
  @IsOptional()
  @IsNumber()
  unidadEjecutoraId: number;

  @IsOptional()
  @IsNumber()
  ordenadorId: number;

  @IsOptional()
  @IsNumber()
  numeroConstancia: number;

  @IsOptional()
  @IsNumber()
  claseContratistaId: number;

  @IsOptional()
  @IsNumber()
  tipoMonedaId: number;

  @IsOptional()
  @IsNumber()
  valorPesos: number;

  @IsOptional()
  @IsNumber()
  tipoGastoId: number;

  @IsOptional()
  @IsNumber()
  origenRecursosId: number;

  @IsOptional()
  @IsNumber()
  origenPresupuestosId: number;

  @IsOptional()
  @IsNumber()
  temaGastoInversionId: number;

  @IsOptional()
  @IsNumber()
  valorContratoMe: number;

  @IsOptional()
  @IsNumber()
  valorTasaCambio: number;

  @IsOptional()
  @IsNumber()
  medioPogoId: number;

  @IsOptional()
  @IsBoolean()
  clausulaRegistroPresupuestal: boolean;

  @IsOptional()
  @IsString()
  modoPago: string;

  @IsOptional()
  @IsString()
  observaciones: string;

  @IsOptional()
  @IsString()
  vigencia: string;

  @IsOptional()
  @IsString()
  consecutivoElaboracion: string;

  @IsOptional()
  @IsDate()
  fechaInicial: Date;

  @IsOptional()
  @IsDate()
  fechaFinal: Date;

  @IsOptional()
  @IsString()
  usuarioLegacy: string;
}
