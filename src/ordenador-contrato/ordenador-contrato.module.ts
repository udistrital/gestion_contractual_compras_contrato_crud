import { Module } from '@nestjs/common';
import { OrdenadorContratoService } from './ordenador-contrato.service';
import { OrdenadorContratoController } from './ordenador-contrato.controller';

@Module({
  controllers: [OrdenadorContratoController],
  providers: [OrdenadorContratoService],
})
export class OrdenadorContratoModule {}
