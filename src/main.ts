import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './api/common/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(3000);
}
bootstrap();
