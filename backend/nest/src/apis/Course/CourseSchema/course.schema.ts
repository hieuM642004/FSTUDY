import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import slugify from 'slugify';
import { ContentType } from 'src/utils/constants';

@Schema({ timestamps: true })
export class Quiz {
    @Prop({ required: true })
    question: string;

    @Prop({ required: true })
    options: string[];

    @Prop({ required: true })
    correctAnswer: number;

    @Prop()
    explanation: string;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);

@Schema({ timestamps: true })
export class FillInTheBlank {
    @Prop({ required: true })
    sentence: string;
    @Prop({ required: true })
    correctAnswers: string[];
}

export const FillInTheBlankSchema =
    SchemaFactory.createForClass(FillInTheBlank);

@Schema({ timestamps: true })
export class WordMatching {
    @Prop({ required: true })
    words: string[];

    @Prop({ required: true })
    matches: string[];
}

export const WordMatchingSchema = SchemaFactory.createForClass(WordMatching);

@Schema({ timestamps: true })
export class Video {
    @Prop({ required: true })
    videoUrl: string;

    @Prop({ required: true })
    title: string;
    @Prop({ required: true })
    description: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);

@Schema({ timestamps: true })
export class Content {
    @Prop({
        required: true,
        enum: ContentType,
    })
    content_type: ContentType;
    @Prop({ required: true })
    slug: string;

    @Prop([{ type: SchemaTypes.ObjectId, ref: 'Quiz' }])
    quiz?: Types.ObjectId[];

    @Prop([{ type: SchemaTypes.ObjectId, ref: 'FillInTheBlank' }])
    fill_in_the_blank?: Types.ObjectId[];

    @Prop([{ type: SchemaTypes.ObjectId, ref: 'WordMatching' }])
    word_matching?: Types.ObjectId[];

    @Prop([{ type: SchemaTypes.ObjectId, ref: 'Video' }])
    video?: Types.ObjectId[];
}

export const ContentSchema = SchemaFactory.createForClass(Content);

@Schema({ timestamps: true })
export class Lesson {
    @Prop({ required: true })
    title: string;
    @Prop({ required: true })
    lesson: number;
    @Prop({ required: true })
    slug: string;

    @Prop([{ type: Types.ObjectId, ref: 'Content' }])
    content: Types.ObjectId[];

    @Prop({ required: true })
    isFree: boolean;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);

@Schema({ timestamps: true })
export class CourseType {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    description: string;

    @Prop({ type: Date, default: Date.now })
    date: Date;

    @Prop({ required: true })
    slug: string;

    async generateSlug() {
        this.slug = await slugify(this.name, {
            lower: true,
            remove: /[*+~.()'"!:@]/g,
        });
    }
}

export const CourseTypeSchema = SchemaFactory.createForClass(CourseType);

@Schema({ timestamps: true })
export class Course {
    // General
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    slug: string;

    @Prop({ required: true })
    thumbnail: string;

    @Prop({ default: false })
    featured: boolean;

    @Prop({ required: true })
    display_order: number;

    @Prop({ required: true })
    detail_title: string;

    @Prop({ required: true })
    detail_type: string;

    @Prop({ required: true })
    detail_short_description: string;

    @Prop({ required: true })
    detail_content: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'CourseType' })
    typeCourse: Types.ObjectId;

    @Prop([{ type: Types.ObjectId, ref: 'Lesson' }])
    lessons: Types.ObjectId[];

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    discount: number;

    @Prop({ required: true, default: Date.now })
    createdAt: Date;

    @Prop({ required: true, default: Date.now })
    updatedAt: Date;

    @Prop({ type: String, ref: 'User', required: true })
    createdBy: string;

    @Prop({ type: String, ref: 'User', required: true })
    updatedBy: string;

    @Prop([
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            content: { type: String, required: true },
            name: { type: String },
            avatar: { type: String },
            date: { type: Date, default: Date.now },
        },
    ])
    comments: Array<{
        user: mongoose.Schema.Types.ObjectId;
        content: string;
        name: string;
        avatar: string;
        date: Date;
    }>;
}

export type CourseDocument = HydratedDocument<Course>;

export const CourseSchema = SchemaFactory.createForClass(Course);

export enum PaymentStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
}

@Schema({ timestamps: true })
export class Purchase {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true })
    course: Types.ObjectId;

    @Prop({ required: true, unique: true })
    purchaseKey: string;
    @Prop({ required: true })
    paymentMethod: string;
    @Prop({ required: true, default: Date.now })
    purchaseDate: Date;

    @Prop({ required: true, default: Date.now })
    expiryDate: Date;

    @Prop({ required: true, default: PaymentStatus.PENDING })
    paymentStatus: PaymentStatus;
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
