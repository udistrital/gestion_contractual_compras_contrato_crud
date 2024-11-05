import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryContratoGeneralDto {
  @ApiPropertyOptional({
    description:
      'Campos a retornar (separados por comas). Ejemplo: "vigencia,valorPesos,observaciones"',
  })
  @IsOptional()
  @IsString()
  fields?: string;

  @ApiPropertyOptional({
    description: 'Campo por el cual ordenar',
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({
    description: 'Dirección del ordenamiento',
    enum: ['ASC', 'DESC'],
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  orderBy?: 'ASC' | 'DESC';

  @ApiPropertyOptional({
    description: 'Número de registros a retornar',
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({
    description: 'Número de registros a saltar',
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number;

  @ApiPropertyOptional({
    description:
      'Filtros dinámicos en formato JSON. Ejemplo: {"vigencia": "2024", "activo": true}',
  })
  @IsOptional()
  @IsString()
  query?: string;
}
