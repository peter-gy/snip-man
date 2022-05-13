import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { config as dotenvConfig } from 'dotenv';

// Load environment variables dynamically from 'assets/.env.development' or 'assets/.env.production'
const envPath = join(__dirname, 'assets', `.env.${process.env.NODE_ENV}`);
const result = dotenvConfig({ path: envPath });
if (result.error) {
  Logger.error(`Error loading file: ${envPath}`);
  throw result.error;
} else {
  Logger.log(`Loaded env file: ${envPath}`);
}

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Generating OpenAPI specification
  const openApiConfig = new DocumentBuilder()
    .setTitle('SnipMan Server')
    .setDescription('API exposing the SnipMan backend')
    .setVersion('1.0')
    .addTag('snip-man')
    .build();
  const document = SwaggerModule.createDocument(app, openApiConfig);
  // Exposing the docs at http(s)://<host>:<port>/api
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );

  const config = app.get(ConfigService);
  Logger.log(`💪 Running in \`${config.get<string>('environment')}\` mode`);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
bootstrap().then((_) => Logger.log('✅ Bootstrap done'));
