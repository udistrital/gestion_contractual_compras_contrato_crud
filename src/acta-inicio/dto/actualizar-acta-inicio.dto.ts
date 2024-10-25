import { PartialType } from '@nestjs/mapped-types';
import { CrearActaInicioDto } from './crear-acta-inicio.dto';

export class ActualizarActaInicioDto extends PartialType(CrearActaInicioDto) {}
