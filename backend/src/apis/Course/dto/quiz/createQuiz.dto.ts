import { Transform } from 'class-transformer';
import { IsString, IsArray, IsOptional, IsNumber } from 'class-validator';

export class CreateQuizDto {
  @IsString()
  question: string;

  @IsArray()
  options: string[];

  @Transform(({ value }) => Number(value))
  @IsNumber()
  correctAnswer: number;

  @IsString()
  @IsOptional()
  explanation?: string;
}
