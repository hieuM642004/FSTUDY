import { IsEnum, IsOptional } from 'class-validator';

export class CreateQuestionGroupDto {
    @IsOptional()
    title: string;

    @IsOptional()
    description: string;

    @IsOptional()
    audioUrl?: string;

    @IsOptional()
    passageText?: string;

    @IsOptional()
    imageUrl?: string;
    @IsOptional()
    examSession?: string;

    @IsOptional()
    questions: string[];
}
