// src/flashcards/dto/CreateFlashCard.dto.ts
import { IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from 'src/apis/users/UserSchema/user.schema';

class WordDto {
//   @IsString()
//   @IsNotEmpty()
  word: string;

//   @IsString()
//   @IsNotEmpty()
  definition: string;

//   @IsString()
  audioUrl: string;
}

export class UpdateFlashCardDto {
//   @IsString()
//   @IsNotEmpty()
  nameCard: string;

//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => WordDto)
  words: WordDto[];

//   @IsNumber()
  wordCount: number;

//   @IsBoolean()
  isPublic: boolean;

//   @IsMongoId()
//   @IsNotEmpty()
  userId: string;
}
