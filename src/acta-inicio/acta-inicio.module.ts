// acta-inicio.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActaInicioService } from './acta-inicio.service';
import { ActaInicioController } from './acta-inicio.controller';
import { ActaInicio } from './entities/acta-inicio-entity';
import { ContratoGeneralModule } from '../contrato-general/contrato-general.module'; // Importa el módulo de contrato-general

@Module({
  imports: [
    TypeOrmModule.forFeature([ActaInicio]),
    ContratoGeneralModule, // Asegúrate de importar el módulo
  ],
  controllers: [ActaInicioController],
  providers: [ActaInicioService],
  exports: [ActaInicioService],
})
export class ActaInicioModule {}
