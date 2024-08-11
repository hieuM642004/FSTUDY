import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './apis/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './auth/JWT/jwt.decode';
import * as bodyParser from 'body-parser';
import { BlogModule } from './apis/blogs/blog.module';
import { CourseModule } from './apis/Course/course.module';
import { FlashCardModule } from './apis/flashCards/flashCard.module';
import { CommentModule1 } from './apis/socket/comments/comment.module';

@Module({
  imports: [
    UserModule,
    BlogModule,
    AuthModule,
    CourseModule,
    FlashCardModule,
    CommentModule1,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
    consumer.apply(JwtMiddleware).forRoutes('*');
    consumer.apply(bodyParser.urlencoded({ extended: true })).forRoutes('*');
    consumer.apply(bodyParser.json()).forRoutes('*');
  }
}

