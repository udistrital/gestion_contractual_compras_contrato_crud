import { Module } from '@nestjs/common';
import { DocumentoContratoService } from './documento-contrato.service';
import { DocumentoContratoController } from './documento-contrato.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DocumentoContrato} from "./entities/documento-contrato.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DocumentoContrato])],
  controllers: [DocumentoContratoController],
  providers: [DocumentoContratoService],
})
export class DocumentoContratoModule {}
