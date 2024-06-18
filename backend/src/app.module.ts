import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import cors from 'cors';
//Modules

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(cookieParser()).forRoutes('*');
        consumer

            .apply(bodyParser.urlencoded({ extended: true }))
            .forRoutes('*');
        consumer.apply(bodyParser.json()).forRoutes('*');
    }
}
