import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../apps/api/src/app.module';
import express from 'express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const server = express();

let app: any;

async function bootstrap() {
  if (app) return server;

  app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    logger: ['error', 'warn'],
  });

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  try {
    app.useStaticAssets(join(process.cwd(), 'apps/api/uploads'), {
      prefix: '/api/uploads/',
    });
  } catch {}

  const config = new DocumentBuilder()
    .setTitle('Toorvest API')
    .setDescription('Toorvest virtual trade expo platform API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.init();
  return server;
}

export default async function handler(req: any, res: any) {
  const srv = await bootstrap();
  return srv(req, res);
}
