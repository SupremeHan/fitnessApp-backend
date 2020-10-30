import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { StorageConfig } from 'config/storage.config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(StorageConfig.photo.destination, {
    prefix: StorageConfig.photo.urlPrefix,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    index: false,
  });

  app.enableCors();

  await app.listen(5000);
}
bootstrap();
