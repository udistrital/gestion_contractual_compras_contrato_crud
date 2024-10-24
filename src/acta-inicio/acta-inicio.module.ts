import { Module } from '@nestjs/common';
import { ActaInicioController } from './acta-inicio.controller';
import { ActaInicioService } from './acta-inicio.service';

@Module({
  controllers: [ActaInicioController],
  providers: [ActaInicioService]
})
export class ActaInicioModule {}
