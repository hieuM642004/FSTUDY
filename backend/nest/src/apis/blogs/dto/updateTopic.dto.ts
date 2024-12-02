import { IsString, IsArray } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdateTopicDto {
    // @IsString()
    // name: string;

    @IsString()
    description: string;
}