declare const module: any;
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipes/validation.pipe';
import * as cookieParser from "cookie-parser";
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
    app.enableCors({
        origin: '*',
        credentials: true
    })
    app.use(json());
    app.use(urlencoded({ extended: true }));
  await app.listen(4000);
  
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
