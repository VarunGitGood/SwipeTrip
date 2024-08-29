import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(8080);
}
bootstrap();
