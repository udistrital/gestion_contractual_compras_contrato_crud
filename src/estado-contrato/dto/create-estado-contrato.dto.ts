import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
} from 'class-validator';

export class CreateEstadoContratoDto {
  @IsNotEmpty()
  @IsNumber()
  usuario_id: number;

  @IsNotEmpty()
  @IsNumber()
  estado_parametro_id: number;

  @IsNotEmpty()
  @IsString()
  motivo: string;

  @IsNotEmpty()
  @IsDate()
  fecha_ejecucion_estado: Date;

  @IsNotEmpty()
  @IsNumber()
  contrato_general_id: number;

  @IsNotEmpty()
  @IsDate()
  fecha_creacion: Date;
}
