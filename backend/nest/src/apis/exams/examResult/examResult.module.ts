import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import {
    ExamResult,
    ExamResultSchema,
} from './ExamResultSchema/examResult.schema';
import { ExamResultController } from './examResult.controller';
import { ExamResultService } from './examResult.service';
import { ExamSession, ExamSessionSchema } from '../ExamSchema/exam.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ExamResult.name, schema: ExamResultSchema },
            {name : ExamSession.name, schema: ExamSessionSchema},
        ]),
    ],
    controllers: [ExamResultController],
    providers: [ExamResultService],
})
export class ExamResultModule {}
