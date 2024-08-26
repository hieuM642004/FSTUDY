import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    Exams,
    ExamSession,
    Question,
    ExamSchema,
    ExamSessionSchema,
    QuestionSchema,
    QuestionGroupSchema,
    QuestionGroup,
} from './ExamSchema/exam.schema';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { GoogleDriveUploader } from 'src/providers/storage/drive/drive.upload';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Exams.name, schema: ExamSchema },
            { name: ExamSession.name, schema: ExamSessionSchema },
            { name: QuestionGroup.name, schema: QuestionGroupSchema },
            { name: Question.name, schema: QuestionSchema },
        ]),
    ],
    controllers: [ExamController],
    providers: [ExamService,GoogleDriveUploader],
})
export class ExamModule {}
