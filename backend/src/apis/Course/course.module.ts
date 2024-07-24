import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GoogleDriveUploader } from 'src/providers/storage/drive/drive.upload';
import { Course,  CourseSchema, CourseType, CourseTypeSchema } from './courseSchema/course.schema';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: CourseType.name, schema: CourseTypeSchema },
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService, GoogleDriveUploader],
})
export class CourseModule {}
