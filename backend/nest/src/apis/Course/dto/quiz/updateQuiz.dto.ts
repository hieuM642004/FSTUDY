import { Transform } from 'class-transformer';
import { IsString, IsArray, IsOptional, IsNumber } from 'class-validator';

export class UpdateQuizDto {
  @IsString()
  @IsOptional()
  question?: string;

  @IsArray()
  @IsOptional()
  options?: string[];

  @Transform(({ value }) => Number(value))
  @IsNumber()
  correctAnswer: number;

  @IsString()
  @IsOptional()
  explanation?: string;
}
