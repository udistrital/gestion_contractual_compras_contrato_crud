import { Module } from '@nestjs/common';
import { EspecificacionTecnicaService } from './especificacion-tecnica.service';
import { EspecificacionTecnicaController } from './especificacion-tecnica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspecificacionTecnica } from './entities/especificacion-tecnica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EspecificacionTecnica])],
  controllers: [EspecificacionTecnicaController],
  providers: [EspecificacionTecnicaService],
})
export class EspecificacionTecnicaModule {}
