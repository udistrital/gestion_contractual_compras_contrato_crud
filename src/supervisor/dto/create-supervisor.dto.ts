import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSupervisorDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  supervisor_id: number;

  @IsOptional()
  @IsString()
  sede_legado?: string;

  @IsOptional()
  @IsString()
  dependencia_legado?: string;

  @IsOptional()
  @IsString()
  cargo_legado?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  cargo_id?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  documento?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  digito_verificacion?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  sede_id?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  dependencia_id?: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  contrato_general_id: number;
}
