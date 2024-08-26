import { IsMongoId, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateBlogDto {
  
  // @IsString()
  // readonly name: string;
  @IsString()
  readonly title: string;
  @IsString()
  readonly content: string;
  @IsString()
  readonly avatar: string;
  @IsString()
  readonly status: string;
  readonly slug: string;
  @IsString()
  childTopics: ObjectId[];
  @IsString()
  readonly user: ObjectId;
}
