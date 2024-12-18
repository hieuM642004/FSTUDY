import { title } from 'process';
import { IsEnum, IsMongoId, IsOptional, IsString } from "class-validator";

export class createContentDto {
    // @IsString()
    // @IsEnum(['quiz', 'fill_in_the_blank', 'word_matching', 'video'])
    // content_type: string;
    @IsString()

    title:string;

  
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
    slug : string;
  }