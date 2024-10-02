import { PartialType } from '@nestjs/swagger';
import { CreateLugarEjecucionDto } from './create-lugar-ejecucion.dto';

export class UpdateLugarEjecucionDto extends PartialType(
  CreateLugarEjecucionDto,
) {}
