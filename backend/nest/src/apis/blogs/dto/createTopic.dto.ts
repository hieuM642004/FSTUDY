import { IsString, IsArray } from 'class-validator';

export class CreateTopicDto {
    // @IsString()
    // name: string;

    @IsString()
    description: string;
}