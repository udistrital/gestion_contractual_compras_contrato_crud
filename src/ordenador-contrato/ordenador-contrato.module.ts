import { Module } from '@nestjs/common';
import { OrdenadorContratoService } from './ordenador-contrato.service';
import { OrdenadorContratoController } from './ordenador-contrato.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenadorContrato } from './entities/ordenador-contrato.entity';
import { ContratoGeneral } from 'src/contrato-general/entities/contrato-general.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrdenadorContrato, ContratoGeneral])],
  controllers: [OrdenadorContratoController],
  providers: [OrdenadorContratoService],
})
export class OrdenadorContratoModule {}
