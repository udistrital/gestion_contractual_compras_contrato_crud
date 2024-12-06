import {
    IsNotEmpty,
    IsNumber,
    IsString,
    IsBoolean,
    IsDate,
    IsOptional,
  } from 'class-validator';
export class CreateOrdenadorContratoDto {
    @IsNotEmpty()
    @IsNumber()
    terceroId: number;

    @IsNotEmpty()
    @IsNumber()
    ordenadorArgoId: number;

    @IsNotEmpty()
    @IsNumber()
    ordenadorSikarcaId: number;

    @IsNotEmpty()
    @IsString()
    resolucion: string;

    @IsNotEmpty()
    @IsString()
    documentoIdentidad: string;

    @IsNotEmpty()
    @IsNumber()
    cargoId: number;

    @IsNotEmpty()
    @IsNumber()
    contrato_general_id: number;

    @IsOptional()
    @IsBoolean()
    activo?: boolean;
  
    @IsOptional()
    @IsDate()
    fecha_creacion?: Date;
  
    @IsOptional()
    @IsDate()
    fecha_modificacion?: Date;
}
