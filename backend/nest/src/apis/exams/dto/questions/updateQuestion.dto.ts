import { IsEnum,IsOptional } from "class-validator";

export class UpdateQuestionDto{
    @IsOptional()
  readonly  question: string;

   @IsEnum( ['multiple-choice', 'fill-in-the-blank', 'short-answer'])
   readonly questionType: string;

    @IsOptional()
   readonly questionText: string;

    @IsOptional()
  readonly  options?: string[];

    @IsOptional()
   readonly correctAnswer: string | string[];

    @IsOptional()
  readonly  explanation: string;

    @IsOptional()
    audioUrl?: string;

    @IsOptional()
    imageUrl?: string;

    @IsOptional()
 readonly   examSession: string;
}