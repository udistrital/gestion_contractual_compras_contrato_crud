import { Module } from '@nestjs/common';
import { EstadoContratoService } from './estado-contrato.service';
import { EstadoContratoController } from './estado-contrato.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoContrato } from './entities/estado-contrato.entity';
import { ContratoGeneral } from '../contrato-general/entities/contrato-general.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoContrato, ContratoGeneral])],
  controllers: [EstadoContratoController],
  providers: [EstadoContratoService],
})
export class EstadoContratoModule {}
