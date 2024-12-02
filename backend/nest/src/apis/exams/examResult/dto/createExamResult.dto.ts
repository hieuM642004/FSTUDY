import { IsOptional } from 'class-validator';

export class CreateExamResultDto {
    @IsOptional()
    readonly examSessionId: string;

    @IsOptional()
    readonly correctAnswers: string[];

    @IsOptional()
    readonly incorrectAnswers: string[];

    @IsOptional()
    readonly skippedAnswers: string[];

    @IsOptional()
    readonly completionTime: string;

    @IsOptional()
    readonly type: string;

    @IsOptional()
    readonly idUser: string;
}
