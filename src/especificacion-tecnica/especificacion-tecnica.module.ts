import { Module } from '@nestjs/common';
import { EspecificacionTecnicaController } from './especificacion-tecnica.controller';
import { EspecificacionTecnicaService } from './especificacion-tecnica.service';

@Module({
  controllers: [EspecificacionTecnicaController],
  providers: [EspecificacionTecnicaService]
})
export class EspecificacionTecnicaModule {}
