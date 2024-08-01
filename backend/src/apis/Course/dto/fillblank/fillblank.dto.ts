import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateFillInTheBlankDto {
  @IsString()
  @IsNotEmpty()
  sentence: string;
  @IsArray()
  @IsNotEmpty()
  correctAnswers: string[];
}
