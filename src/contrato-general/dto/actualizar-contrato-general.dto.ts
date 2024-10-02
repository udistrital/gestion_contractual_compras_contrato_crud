import { PartialType } from '@nestjs/mapped-types';
import { CrearContratoGeneralDto } from './crear-contrato-general.dto';

export class ActualizarContratoGeneralDto extends PartialType(
  CrearContratoGeneralDto,
) {}
