import { IsOptional } from "class-validator";

export class UpdateExamResultDto {
    @IsOptional()
    readonly examSessionId: string;

    @IsOptional()
    readonly correctAnswers: string[];

    @IsOptional()
    incorrectAnswers: string[];

    @IsOptional()
    readonly skippedAnswers: string[];

    @IsOptional()
    readonly completionTime: string;
    @IsOptional()
    
    readonly type: string;

    @IsOptional()
    readonly idUser: string;
}