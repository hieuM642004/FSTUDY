import { IsEnum, IsMongoId, IsOptional, IsString } from "class-validator";

export class updateContentDto {
    @IsString()
    @IsEnum(['quiz', 'fill_in_the_blank', 'word_matching', 'video'])
    content_type: string;
  
    @IsOptional()
    @IsMongoId()
    quiz?: string;
  
    @IsOptional()
    @IsMongoId()
    fill_in_the_blank?: string;
  
    @IsOptional()
    @IsMongoId()
    word_matching?: string;
  
    @IsOptional()
    @IsMongoId()
    listening?: string;
  }