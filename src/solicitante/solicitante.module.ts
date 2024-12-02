import { Module } from '@nestjs/common';
import { SolicitanteService } from './solicitante.service';
import { SolicitanteController } from './solicitante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratoGeneral } from '../contrato-general/entities/contrato-general.entity';
import { SolicitanteEntity } from './entities/solicitante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SolicitanteEntity, ContratoGeneral])],
  controllers: [SolicitanteController],
  providers: [SolicitanteService],
})
export class SolicitanteModule {}
