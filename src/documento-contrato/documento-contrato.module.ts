import { Module } from '@nestjs/common';
import { DocumentoContratoService } from './documento-contrato.service';
import { DocumentoContratoController } from './documento-contrato.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentoContrato } from './entities/documento-contrato.entity';
import { ContratoGeneral } from '../contrato-general/entities/contrato-general.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentoContrato]),
    TypeOrmModule.forFeature([ContratoGeneral]),
  ],
  controllers: [DocumentoContratoController],
  providers: [DocumentoContratoService],
})
export class DocumentoContratoModule {}
