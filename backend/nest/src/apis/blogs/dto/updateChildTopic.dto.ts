import { IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdateChildTopicDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    topic: ObjectId[];
}