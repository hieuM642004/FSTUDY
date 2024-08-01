import { IsArray, IsString, IsOptional } from 'class-validator';

export class UpdateWordMatchingDto {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  words?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  matches?: string[];
}