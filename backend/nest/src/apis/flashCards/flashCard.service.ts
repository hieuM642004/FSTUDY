import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
    FlashCard,
    FlashCardDocument,
} from './FlashCardSchema/FlashCard.schema';
import { CreateFlashCardDto, WordDto } from './dto/CreateFlashCard.dto';


@Injectable()
export class FlashCardService {
    constructor(
        @InjectModel(FlashCard.name)
        private readonly flashCardModel: Model<FlashCardDocument>,
        private readonly httpService: HttpService,
    ) {}
    async getFlashCards(): Promise<FlashCard[]> {
        try {
            return await this.flashCardModel.find();
        } catch (error) {
            console.error(error);
        }
    }
    async getFlashCardById(id: string): Promise<FlashCard[]> {
        try {
           const flashCard= await this.flashCardModel.findById(id);
           if (!flashCard) {
            throw new HttpException(
                `FlashCard with ID '${id}' not found`,
                HttpStatus.NOT_FOUND,
            );
        }
        return [flashCard]
        } catch (error) {
            console.error(error);
        }
    }
    async createFlashCard(
        createFlashCardDto: CreateFlashCardDto,
    ): Promise<FlashCard> {
        const flashCard = new this.flashCardModel(createFlashCardDto);
        flashCard.wordCount = createFlashCardDto.words.length;
        for (const word of flashCard.words) {
            try {
            } catch (error) {
                console.error('Error creating flash card:', error);
                throw new HttpException(error.message, error.status);
            }
        }

        return flashCard.save();
    }

    async updateFlashCard(
        id: string,
        updateFlashCardDto: CreateFlashCardDto,
    ): Promise<FlashCard> {
        const flashCard = await this.flashCardModel.findById(id);
        if (!flashCard) {
            throw new HttpException(
                `FlashCard with ID '${id}' not found`,
                HttpStatus.NOT_FOUND,
            );
        }

  

        updateFlashCardDto.wordCount = updateFlashCardDto.words.length;
        updateFlashCardDto.userId = updateFlashCardDto.userId;

        return await this.flashCardModel.findByIdAndUpdate(
            id,
            updateFlashCardDto,
            { new: true },
        );
    }

    async deleteFlashCard(id: string): Promise<FlashCard> {
        try {
            const flashCard = await this.flashCardModel.findByIdAndDelete(id);
            if (!flashCard) {
                throw new HttpException(
                    `FlashCard with ID '${id}' not found`,
                    HttpStatus.NOT_FOUND,
                );
            }
            return flashCard;
        } catch (error) {
            throw error;
        }
    }
    //Words
    // Add a word to the words array
    async addWordToFlashCard(
        id: string,
        wordDto: WordDto,
    ): Promise<FlashCard> {
        const flashCard = await this.flashCardModel.findById(id);
        if (!flashCard) {
            throw new HttpException(
                `FlashCard with ID '${id}' not found`,
                HttpStatus.NOT_FOUND,
            );
        }

        flashCard.words.push(wordDto );
        flashCard.wordCount = flashCard.words.length;

        return flashCard.save();
    }

    // Update a word in the words array
    async updateWordInFlashCard(
        id: string,
        wordIndex: number,
        wordDto: WordDto,
    ): Promise<FlashCard> {
        const flashCard = await this.flashCardModel.findById(id);
        if (!flashCard) {
            throw new HttpException(
                `FlashCard with ID '${id}' not found`,
                HttpStatus.NOT_FOUND,
            );
        }

        if (wordIndex < 0 || wordIndex >= flashCard.words.length) {
            throw new HttpException(
                `Word index '${wordIndex}' is out of bounds`,
                HttpStatus.BAD_REQUEST,
            );
        }

      
        flashCard.words[wordIndex] = wordDto ;
        flashCard.wordCount = flashCard.words.length;

        return flashCard.save();
    }

    // Remove a word from the words array
    async removeWordFromFlashCard(
        id: string,
        wordIndex: number,
    ): Promise<FlashCard> {
        const flashCard = await this.flashCardModel.findById(id);
        if (!flashCard) {
            throw new HttpException(
                `FlashCard with ID '${id}' not found`,
                HttpStatus.NOT_FOUND,
            );
        }

        if (wordIndex < 0 || wordIndex >= flashCard.words.length) {
            throw new HttpException(
                `Word index '${wordIndex}' is out of bounds`,
                HttpStatus.BAD_REQUEST,
            );
        }

        flashCard.words.splice(wordIndex, 1);
        flashCard.wordCount = flashCard.words.length;

        return flashCard.save();
    }
   
   
}
