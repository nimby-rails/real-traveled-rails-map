import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser(process.env.AUTH_SIGNING_SECRET));
  app.use(bodyParser.text());
  await app.listen(3000);
}
bootstrap();
