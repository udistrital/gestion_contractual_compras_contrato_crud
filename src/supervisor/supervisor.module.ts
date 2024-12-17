import { Module } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { SupervisorController } from './supervisor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratoGeneral } from '../contrato-general/entities/contrato-general.entity';
import { SupervisorEntity } from './entities/supervisor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupervisorEntity, ContratoGeneral])],
  controllers: [SupervisorController],
  providers: [SupervisorService],
})
export class SupervisorModule {}
