import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActaInicioService } from './acta-inicio.service';
import { ActaInicioController } from './acta-inicio.controller';
import { ActaInicio } from './entities/acta-inicio-entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActaInicio])],
  controllers: [ActaInicioController],
  providers: [ActaInicioService],
  exports: [ActaInicioService],
})
export class ActaInicioModule {}
