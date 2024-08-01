import { IsArray, IsString } from 'class-validator';

export class CreateWordMatchingDto {
  @IsArray()
  @IsString({ each: true })
  words: string[];

  @IsArray()
  @IsString({ each: true })
  matches: string[];
}