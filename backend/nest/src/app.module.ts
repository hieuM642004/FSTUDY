import { MiddlewareConsumer, Module, NestModule, Logger } from '@nestjs/common';
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
import { ExamModule } from './apis/exams/exam.module';
import { ExamResultModule } from './apis/exams/examResult/examResult.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SheetModule } from './providers/storage/sheet/sheet.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    UserModule,
    BlogModule,
    AuthModule,
    CourseModule,
    FlashCardModule,
    CommentModule1,
    ExamModule,
    ExamResultModule,
    SheetModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly logger = new Logger(AppModule.name);

  configure(consumer: MiddlewareConsumer) {
  
    consumer
      .apply((req, res, next) => {
        const userAgent = req.headers['user-agent'] || '';
        const platform = req.headers['sec-ch-ua-platform'] || 'Unknown Platform';

        this.logger.log(`Request Method: ${req.method}`);
        this.logger.log(`Request URL: ${req.url}`);
        this.logger.log(`Device Info - User-Agent: ${userAgent}`);
        this.logger.log(`Device Info - Platform: ${platform}`);
        next();
      })
      .forRoutes('*');
    consumer.apply(cookieParser()).forRoutes('*');
    consumer.apply(JwtMiddleware).forRoutes('*');
    consumer.apply(bodyParser.urlencoded({ extended: true })).forRoutes('*');
    consumer.apply(bodyParser.json()).forRoutes('*');
  }
}
