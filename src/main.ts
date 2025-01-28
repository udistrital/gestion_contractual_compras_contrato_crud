import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as compression from 'compression';
import helmet from 'helmet';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const config = new DocumentBuilder()
    .setTitle('Gestion Contractual CRUD')
    .setDescription('API para la gestión contractual')
    .setVersion('1.0')
    .addTag('gestion-contractual')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const outputPath = join(process.cwd(), 'swagger');
  fs.mkdirSync(outputPath, { recursive: true });
  fs.writeFileSync(
    join(outputPath, 'swagger.json'),
    JSON.stringify(document, null, 2),
  );
  fs.writeFileSync(join(outputPath, 'swagger.yaml'), yaml.dump(document));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  app.enableCors();
  app.use(helmet()); // Seguridad
  app.use(compression()); // Compresión

  await app.listen(parseInt(process.env.PORT) || 8080);
}
bootstrap();
