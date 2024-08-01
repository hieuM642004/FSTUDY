import { IsString } from 'class-validator';

export class updateVideoDto {
 
  @IsString()
  title?: string;

  @IsString()
  description?: string;
}
