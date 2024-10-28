import { Module } from '@nestjs/common';
import { CdpService } from './cdp.service';
import { CdpController } from './cdp.controller';
import { ContratoGeneral } from '../contrato-general/entities/contrato-general.entity';
import { Cdp } from './entities/cdp.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cdp, ContratoGeneral])],
  controllers: [CdpController],
  providers: [CdpService],
})
export class CdpModule {}
