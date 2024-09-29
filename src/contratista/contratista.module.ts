import { Module } from '@nestjs/common';
import { ContratistaService } from './contratista.service';
import { ContratistaController } from './contratista.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contratista } from './entities/contratista.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contratista])],
  controllers: [ContratistaController],
  providers: [ContratistaService],
})
export class ContratistaModule {}
