import { title } from 'process';
import { IsEnum, IsMongoId, IsOptional, IsString } from "class-validator";

export class updateContentDto {
    @IsString()
    title:string;
  }