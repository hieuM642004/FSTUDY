import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Max, Min, IsOptional } from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty()
  @IsString()
  courseId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional() 
  @IsString()
  comment?: string; 
}
