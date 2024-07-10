import {
    Body,
    Controller,
    Get,
    Post,
    Param,
    Delete,
    Put,
} from '@nestjs/common';
import { FlashCardService } from './flashCard.service';
import { ResponseData } from 'src/global/globalClass';
import { CreateFlashCardDto } from './dto/CreateFlashCard.dto';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { FlashCard } from './FlashCardSchema/FlashCard.schema';
import { UpdateFlashCardDto } from './dto/UpdateFlashCard.dto';

@Controller('flashcards')
export class FlashCardController {
    constructor(private flashCardService: FlashCardService) {}
    @Get()
    async getFlashCards(): Promise<ResponseData<FlashCard[]>> {
        try {
            const flashCards = await this.flashCardService.getFlashCards();
            return new ResponseData<FlashCard[]>(
                flashCards,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<any>(
                null,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }
    @Get(':id')
    async getFlashCardById(
        @Param('id') id: string,
    ): Promise<ResponseData<FlashCard[]>> {
        try {
            const flashCard = await this.flashCardService.getFlashCardById(id);
            return new ResponseData<FlashCard[]>(
                flashCard,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<any>(
                null,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }
    @Post('create-flashcard')
    async createCourseType(
        @Body() FlashCard: CreateFlashCardDto,
    ): Promise<ResponseData<FlashCard>> {
        try {
            const saveFlashCard =
                await this.flashCardService.createFlashCard(FlashCard);
            return new ResponseData<FlashCard>(
                saveFlashCard,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<any>(
                null,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }
    @Put('update-flashcard/:id')
    async updateFlashCard(
        @Param('id') id: string,
        @Body() updateFlashCardDto: UpdateFlashCardDto,
    ): Promise<ResponseData<FlashCard>> {
        try {
            const updatedFlashCard =
                await this.flashCardService.updateFlashCard(
                    id,
                    updateFlashCardDto,
                );
            return new ResponseData<FlashCard>(
                updatedFlashCard,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<any>(
                null,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    @Delete('delete-flashcard/:id')
    async deleteFlashCard(
        @Param('id') id: string,
    ): Promise<ResponseData<FlashCard>> {
        try {
            const flashCard = await this.flashCardService.deleteFlashCard(id);
            return new ResponseData<FlashCard>(
                flashCard,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<any>(
                null,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }
    //Words
    @Post('add-word/:id')
    async addWordToFlashCard(
        @Param('id') id: string,
        @Body() wordDto: { word: string; definition: string },
    ): Promise<ResponseData<FlashCard>> {
        try {
            const updatedFlashCard =
                await this.flashCardService.addWordToFlashCard(id, wordDto);
            return new ResponseData<FlashCard>(
                updatedFlashCard,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<any>(null, HttpStatus.ERROR, error.message);
        }
    }

    @Put('update-word/:id/:wordIndex')
    async updateWordInFlashCard(
        @Param('id') id: string,
        @Param('wordIndex') wordIndex: number,
        @Body() wordDto: { word: string; definition: string },
    ): Promise<ResponseData<FlashCard>> {
        try {
            const updatedFlashCard =
                await this.flashCardService.updateWordInFlashCard(
                    id,
                    wordIndex,
                    wordDto,
                );
            return new ResponseData<FlashCard>(
                updatedFlashCard,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<any>(null, HttpStatus.ERROR, error.message);
        }
    }

    @Delete('remove-word/:id/:wordIndex')
    async removeWordFromFlashCard(
        @Param('id') id: string,
        @Param('wordIndex') wordIndex: number,
    ): Promise<ResponseData<FlashCard>> {
        try {
            const updatedFlashCard =
                await this.flashCardService.removeWordFromFlashCard(
                    id,
                    wordIndex,
                );
            return new ResponseData<FlashCard>(
                updatedFlashCard,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<any>(null, HttpStatus.ERROR, error.message);
        }
    }
}
