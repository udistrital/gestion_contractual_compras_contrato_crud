import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContratoGeneralModule } from './contrato-general/contrato-general.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratoGeneralEntity } from './contrato-general/entities/contrato-general.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('GESTION_CONTRACTUAL_CRUD_HOST'),
        port: configService.get('GESTION_CONTRACTUAL_CRUD_PORT'),
        username: configService.get('GESTION_CONTRACTUAL_CRUD_USERNAME'),
        password: configService.get('GESTION_CONTRACTUAL_CRUD_PASS'),
        database: configService.get('GESTION_CONTRACTUAL_CRUD_DB'),
        entities: [ContratoGeneralEntity],
        synchronize: configService.get('DEVELOPER_MODE'), //Solo para desarrollo, en producción se debe desactivar
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      inject: [ConfigService],
    }),
    ContratoGeneralModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
