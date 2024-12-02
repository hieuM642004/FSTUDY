import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class ExamResult {
    @Prop([
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ExamSession',
        },
    ])
    examSessionId: string;

    @Prop([
        {
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Question',
            },
            selectedOptions: { type: [String], required: true },
            isCorrect: { type: Boolean, default: false },
        },
    ])
    correctAnswers: {
        questionId: string;
        selectedOptions: string[];
        isCorrect: boolean;
    }[];

    @Prop([
        {
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Question',
            },
            selectedOptions: { type: [String], required: true },
            isCorrect: { type: Boolean, default: false },
        },
    ])
    incorrectAnswers: {
        questionId: string;
        selectedOptions: string[];
        isCorrect: boolean;
    }[];

    @Prop([
        {
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Question',
            },
            selectedOptions: { type: [String], required: true },
            isCorrect: { type: Boolean, default: false },
        },
    ])
    skippedAnswers: {
        questionId: string;
        selectedOptions: string[];
        isCorrect: boolean;
    }[];

    @Prop({ default: 0 })
    accuracy: number;

    @Prop({ default: '00:00' })
    completionTime: string;

    @Prop()
    type: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    idUser: string;
}

export const ExamResultSchema = SchemaFactory.createForClass(ExamResult);
