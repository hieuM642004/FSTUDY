// src/flashcards/dto/CreateFlashCard.dto.ts
import { IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from 'src/apis/users/UserSchema/user.schema';

export class WordDto {
//   @IsString()
//   @IsNotEmpty()
  word: string;

//   @IsString()
//   @IsNotEmpty()
  definition: string;

//   @IsString()
  audioUrl: string;

  image: string;
}

export class CreateFlashCardDto {
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
