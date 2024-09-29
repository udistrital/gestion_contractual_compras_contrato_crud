import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateContratistaDto {
  @IsNotEmpty()
  @IsString()
  numero_documento: string;

  @IsNotEmpty()
  @IsInt()
  tipo_persona_id: number;

  @IsNotEmpty()
  @IsBoolean()
  activo: boolean;

  @IsOptional()
  @IsUUID()
  contrato_general_id?: string;
}
