import { IsEnum, IsOptional } from 'class-validator';

export class CreateExamsDto {
    @IsEnum(['ielst', 'toeic'])
    readonly examType: string;
    readonly title: string;
    @IsOptional()
    readonly description: string;
    readonly durition: string;
    readonly idSession: string[];
    readonly slug: string;
}
