import { IsEnum, IsOptional } from 'class-validator';

export class UpdateExamsDto {
    @IsEnum(['ielst', 'toeic'])
    readonly examType: string;

    @IsOptional()
    readonly title: string;

    @IsOptional()
    readonly description: string;

    @IsOptional()
    readonly durition: string;
    
    @IsOptional()
    readonly idSession: string[];

    @IsOptional()
    readonly slug: string;
}
