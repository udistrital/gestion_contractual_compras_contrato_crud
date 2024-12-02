import {
  BadRequestException,
  INestApplication,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import helmet from 'helmet';

import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as compression from 'compression';

async function bootstrap() {
  try {
    const logger = new Logger('Bootstrap');
    const app = await NestFactory.create(AppModule);

    // Configuración Swagger
    setupSwagger(app);

    // Pipes globales
    setupGlobalPipes(app);

    // CORS y otros middlewares
    setupMiddlewares(app);

    // Obtener puerto de ConfigService
    const configService = app.get(ConfigService);
    const port = configService.get('PORT', 3117);

    await app.listen(port);
    logger.log(`Application running on port ${port}`);
  } catch (error) {
    Logger.error(`Error starting application: ${error.message}`, error.stack);
    process.exit(1);
  }
}

function setupSwagger(app: INestApplication) {
  try {
    const config = new DocumentBuilder()
      .setTitle('Gestion Contractual CRUD')
      .setDescription('API para la gestión contractual')
      .setVersion('1.0')
      .addTag('gestion-contractual')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    // Guardar documentación
    saveSwaggerDocs(document);
  } catch (error) {
    Logger.error(`Error setting up Swagger: ${error.message}`);
    throw error;
  }
}

function saveSwaggerDocs(document: any) {
  try {
    const outputPath = join(process.cwd(), 'swagger');
    fs.mkdirSync(outputPath, { recursive: true });

    fs.writeFileSync(
      join(outputPath, 'swagger.json'),
      JSON.stringify(document, null, 2),
    );

    fs.writeFileSync(join(outputPath, 'swagger.yaml'), yaml.dump(document));
  } catch (error) {
    Logger.warn(`Error saving Swagger docs: ${error.message}`);
  }
}

function setupGlobalPipes(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true,
      whitelist: true,
      // Añadir validación de errores personalizada
      exceptionFactory: (errors) => {
        const messages = errors.map((error) => ({
          field: error.property,
          message: Object.values(error.constraints).join(', '),
        }));
        return new BadRequestException(messages);
      },
    }),
  );
}

function setupMiddlewares(app: INestApplication) {
  app.enableCors(); // CORS configuration
  app.use(helmet()); // Seguridad
  app.use(compression()); // Compresión
}

bootstrap();
