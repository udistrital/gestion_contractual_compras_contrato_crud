import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  counter: number = 0;

  healthCheck() {
    try {
      return {
        Status: 'ok',
        checkCount: this.counter++,
      };
    } catch (error) {
      return {
        Status: 'error',
        error: error.message,
      };
    }
  }

  getEv() {
    return {
      host: this.configService.get('GESTION_CONTRACTUAL_CRUD_HOST'),
      port: parseInt(
        this.configService.get('GESTION_CONTRACTUAL_CRUD_PORT'),
        10,
      ),
      username: this.configService.get('GESTION_CONTRACTUAL_CRUD_USERNAME'),
      password: this.configService.get('GESTION_CONTRACTUAL_CRUD_PASS'),
      database: this.configService.get('GESTION_CONTRACTUAL_CRUD_DB'),
      schema: this.configService.get('GESTION_CONTRACTUAL_CRUD_DB_SCHEMA'),
    };
  }
}
