import { Module } from '@nestjs/common';
import { ContratoGeneralService } from './contrato-general.service';
import { ContratoGeneralController } from './contrato-general.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratoGeneral } from './entities/contrato-general.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContratoGeneral])],
  controllers: [ContratoGeneralController],
  providers: [ContratoGeneralService],
})
export class ContratoGeneralModule {}
