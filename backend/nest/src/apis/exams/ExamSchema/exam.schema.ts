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
    _id?: any;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    duration: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Exams' })
    idExam: string;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'QuestionGroup' }])
    idQuestionGroups: string[];

    @Prop()
    slug:string
   
}
export const ExamSessionSchema = SchemaFactory.createForClass(ExamSession);

// QuestionGroup
@Schema({ timestamps: true })
export class QuestionGroup {
    @Prop()
    title: string;  

    @Prop()
    description: string;  

    @Prop()
    audioUrl?: string;  

    @Prop()
    passageText?: string;  

    @Prop()
    imageUrl?: string;  
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ExamSession' })
    examSession: mongoose.Schema.Types.ObjectId;;  

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }])
    questions: mongoose.Schema.Types.ObjectId[];
}

export const QuestionGroupSchema = SchemaFactory.createForClass(QuestionGroup);

//Questions
@Schema({ timestamps: true })
export class Question {
    @Prop()
    questionText: string;

    @Prop({ enum: ['multiple-choice', 'fill-in-the-blank', 'short-answer'] })
    questionType: string;

    @Prop([String])
    options?: string[];

    @Prop({ type: mongoose.Schema.Types.Mixed })
    correctAnswer: string | string[];

    @Prop()
    explanation: string;



    @Prop({ default: 0 })
    order: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'QuestionGroup' })
    questionGroup: mongoose.Schema.Types.ObjectId;
}


export const QuestionSchema = SchemaFactory.createForClass(Question);
