import { Module } from '@nestjs/common';
import { LugarEjecucionService } from './lugar-ejecucion.service';
import { LugarEjecucionController } from './lugar-ejecucion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LugarEjecucion } from './entities/lugar-ejecucion.entity';
import { ContratoGeneral } from '../contrato-general/entities/contrato-general.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LugarEjecucion, ContratoGeneral])],
  controllers: [LugarEjecucionController],
  providers: [LugarEjecucionService],
})
export class LugarEjecucionModule {}
