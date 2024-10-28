import { PartialType } from '@nestjs/swagger';
import { CrearActaInicioDto } from './crear-acta-inicio.dto';

export class ActualizarActaInicioDto extends PartialType(CrearActaInicioDto) {}
