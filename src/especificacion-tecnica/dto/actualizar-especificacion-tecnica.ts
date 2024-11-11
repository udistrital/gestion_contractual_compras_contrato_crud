import { PartialType } from '@nestjs/mapped-types';
import { CrearEspecificacionTecnicaDto } from './crear-especificacion-tecnica.dto';

export class ActualizarEspecificacionTecnicaDto extends PartialType(
  CrearEspecificacionTecnicaDto,
) {}
