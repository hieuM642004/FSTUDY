import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { generateSlug } from 'src/utils/generateSlug';

//Exams
@Schema({ timestamps: true })
export class Exams {
    @Prop({ enum: ['ielst', 'toeic'] })
    examType: string;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    durition: string;

    @Prop([{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExamSession',
    }])
    idSession: string[];

    @Prop()
    slug: string;
}

export const ExamSchema = SchemaFactory.createForClass(Exams);

//ExamSession
@Schema({ timestamps: true })
export class ExamSession {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    duration: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Exams' })
    idExam: string;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }])
    idQuestions: string[];

    @Prop()
    slug:string
}
export const ExamSessionSchema = SchemaFactory.createForClass(ExamSession);

//Questions
@Schema({ timestamps: true })
export class Question {
    @Prop()
    question: string;

    @Prop({ enum: ['multiple-choice', 'fill-in-the-blank', 'short-answer'] })
    questionType: string;

    @Prop()
    questionText: string;

    @Prop([String])
    options?: string[];

    @Prop({type:mongoose.Schema.Types.Mixed})
    correctAnswer: string | string[];

    @Prop()
    explanation: string;

    @Prop()
    audioUrl?: string;

    @Prop()
    imageUrl?: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ExamSession' })
    examSession: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
