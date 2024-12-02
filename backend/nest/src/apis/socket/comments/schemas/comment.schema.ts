import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Blog } from 'src/apis/blogs/blogSchema/blog.schema';
import { Course } from 'src/apis/Course/courseSchema/course.schema';
import { User } from 'src/apis/users/userSchema/user.schema';

@Schema({
    timestamps: true,
})
export class Comment extends Document {
    @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
    idUser: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Blog'})
    idBlog: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Course'})
    idCourse: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Comment', default: null })
    parentId: string;

    @Prop({ required: true })
    content: string;

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Comment' }],
        default: [],
    })
    replies: string[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
