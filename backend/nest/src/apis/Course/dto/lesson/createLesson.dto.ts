import { Transform } from 'class-transformer';
import { IsNumber, IsBoolean, IsMongoId } from 'class-validator';

export class createLessonDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  lesson: number;

  @IsMongoId()
  content: string[];

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isFree: boolean;
  title: string;

  slug : string;
}