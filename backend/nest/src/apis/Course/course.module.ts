import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GoogleDriveUploader } from 'src/providers/storage/drive/drive.upload';
import { Content, ContentSchema, Course,  CourseSchema, CourseType, CourseTypeSchema, FillInTheBlank, FillInTheBlankProgress, FillInTheBlankSchema, FillProgressSchema, Lesson, LessonSchema, Purchase, PurchaseSchema, Quiz, QuizProgress, QuizSchema, QuizzProgressSchema, Rating, RatingSchema, Video, 
  VideoProgress, VideoProgressSchema,
  VideoSchema, WordMatching, WordMatchingProgress, WordMatchingProgressSchema, WordMatchingSchema } from './courseSchema/course.schema';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { User, UserSchema } from '../users/userSchema/user.schema';
import FirebaseService from 'src/providers/storage/firebase/firebase.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: CourseType.name, schema: CourseTypeSchema },
      {name : Quiz.name, schema: QuizSchema},
      {name : FillInTheBlank.name, schema: FillInTheBlankSchema},
      {name : WordMatching.name, schema: WordMatchingSchema},
      {name : Video.name, schema: VideoSchema},
      {name : Content.name, schema: ContentSchema},
      {name : Lesson.name, schema: LessonSchema},
      {name : Purchase.name, schema: PurchaseSchema},
      {name : User.name, schema: UserSchema},
      {name : VideoProgress.name, schema: VideoProgressSchema},
      {name : QuizProgress.name, schema: QuizzProgressSchema},
      {name : WordMatchingProgress.name, schema: WordMatchingProgressSchema},
      {name : FillInTheBlankProgress.name, schema: FillProgressSchema},
      {name : Rating.name, schema: RatingSchema}


    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService, GoogleDriveUploader,FirebaseService],
})
export class CourseModule {}
