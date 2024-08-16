import { IsOptional } from "class-validator";

export class UpdateExamSessionDto {
    @IsOptional()
    readonly title: string;

     @IsOptional()
   readonly description: string;

    @IsOptional()
   readonly duration: string;

    @IsOptional()
   readonly idExam: string;

    @IsOptional()
   readonly idQuestions: string[];

    @IsOptional()
   readonly slug: string;
}