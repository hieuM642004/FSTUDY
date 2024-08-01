import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import slugify from 'slugify';

@Schema({ timestamps: true })
export class Topic {
    @Prop({ type: String })
    name: string;

    @Prop({ type: String })
    description: string;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);

@Schema({ timestamps: true })
export class ChildTopic {
    @Prop({ type: String })
    name: string;

    @Prop({ type: String })
    description: string;
    @Prop([
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Topic',
        },
    ])
    topic: mongoose.Schema.Types.ObjectId[];
}

export const ChildTopicSchema = SchemaFactory.createForClass(ChildTopic);

@Schema({ timestamps: true })
export class Blog {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
    user: mongoose.Schema.Types.ObjectId;

    @Prop({ type: String })
    name: string;

    @Prop({ type: String })
    content: string;

    @Prop({ type: String })
    title: string;

    @Prop({ type: String })
    avatar: string;

    @Prop({ type: String, required: true })
    status: string;

    @Prop({ type: String })
    slug: string;

    @Prop([
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ChildTopic',
        },
    ])
    childTopics: mongoose.Schema.Types.ObjectId[];

    @Prop([
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        },
    ])
    likes: Array<{ user: mongoose.Schema.Types.ObjectId }>;

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

    @Prop({ type: Date, default: Date.now })
    date: Date;

    async generateSlug() {
        this.slug = slugify(this.title, {
            lower: true,
            remove: /[*+~.()'"!:@]/g,
        });
    }
}

export const BlogSchema = SchemaFactory.createForClass(Blog);