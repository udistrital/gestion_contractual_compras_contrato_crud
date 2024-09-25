import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CrearContratoGeneralDto {
  @IsNotEmpty()
  @IsNumber()
  tipoCompromisoId: number;

  @IsNotEmpty()
  @IsNumber()
  tipoContratoId: number;

  @IsNotEmpty()
  @IsNumber()
  perfilContratistaId: number;

  @IsNotEmpty()
  @IsDate()
  fechaSuscripcionEstudios: Date;

  @IsNotEmpty()
  @IsBoolean()
  aplicaPoliza: boolean;

  @IsNotEmpty()
  @IsNumber()
  ordenadorId: number;

  @IsNotEmpty()
  @IsNumber()
  modalidadSeleccionId: number;

  @IsNotEmpty()
  @IsNumber()
  tipologiaEspecificaId: number;

  @IsNotEmpty()
  @IsNumber()
  regimenContratacionId: number;

  @IsNotEmpty()
  @IsNumber()
  procedimientoId: number;

  @IsNotEmpty()
  @IsNumber()
  plazoEjecucion: number;

  @IsNotEmpty()
  @IsNumber()
  unidadEjecutoraId: number;

  @IsNotEmpty()
  @IsNumber()
  numeroConstancia: number;

  @IsNotEmpty()
  @IsNumber()
  claseContratistaId: number;

  @IsNotEmpty()
  @IsNumber()
  tipoMonedaId: number;

  @IsNotEmpty()
  @IsNumber()
  valorPesos: number;

  @IsNotEmpty()
  @IsNumber()
  tipoGastoId: number;

  @IsNotEmpty()
  @IsNumber()
  origenRecursosId: number;

  @IsNotEmpty()
  @IsNumber()
  origenPresupuestosId: number;

  @IsNotEmpty()
  @IsNumber()
  temaGastoInversionId: number;

  @IsNotEmpty()
  @IsNumber()
  valorContratoMe: number;

  @IsNotEmpty()
  @IsNumber()
  valorTasaCambio: number;

  @IsNotEmpty()
  @IsNumber()
  medioPogoId: number;

  @IsNotEmpty()
  @IsBoolean()
  clausulaRegistroPresupuestal: boolean;

  @IsNotEmpty()
  @IsString()
  modoPago: string;

  @IsOptional()
  @IsString()
  observaciones: string;

  @IsNotEmpty()
  @IsString()
  vigencia: string;

  @IsNotEmpty()
  @IsString()
  consecutivoElaboracion: string;

  @IsNotEmpty()
  @IsDate()
  fechaInicial: Date;

  @IsNotEmpty()
  @IsDate()
  fechaFinal: Date;

  @IsNotEmpty()
  @IsString()
  usuarioLegacy: string;

  @IsNotEmpty()
  @IsBoolean()
  activo: boolean;
}
