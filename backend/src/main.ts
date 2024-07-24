import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(cors({
    origin: '*', 
  }));
  const PORT = 4000 ; 
  await app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);

  });
}
bootstrap();
