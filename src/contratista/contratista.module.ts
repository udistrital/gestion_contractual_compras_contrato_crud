import { Module } from '@nestjs/common';
import { ContratistaService } from './contratista.service';
import { ContratistaController } from './contratista.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contratista } from './entities/contratista.entity';
import { ContratoGeneral } from '../contrato-general/entities/contrato-general.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contratista, ContratoGeneral])],
  controllers: [ContratistaController],
  providers: [ContratistaService],
})
export class ContratistaModule {}
