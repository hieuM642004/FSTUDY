import {
    Body,
    Controller,
    Get,
    Post,
    Param,
    Delete,
    Put,
    UseGuards,
    BadRequestException,
    Query,
    NotFoundException,
} from '@nestjs/common';
import { FlashCardService } from './flashCard.service';
import { ResponseData } from 'src/global/globalClass';
import { CreateFlashCardDto, WordDto } from './dto/CreateFlashCard.dto';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { FlashCard } from './FlashCardSchema/FlashCard.schema';
import { UpdateFlashCardDto } from './dto/UpdateFlashCard.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateWordReviewDto } from './dto/UpdateWordReviewDto';

@Controller('flashcards')
export class FlashCardController {
    constructor(private flashCardService: FlashCardService) {}
    @Get()
    @UseGuards(AuthGuard('jwt'))
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
    @Get('flashcard-of-user/:id')
    async getFlashCardsOfUser(@Param('id') idUser: string): Promise<ResponseData<FlashCard[]>> {
        console.log(idUser);
        
        try {
            const flashCards = await this.flashCardService.getFlashCardsOfUser(idUser);
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
    @Get('flashcard/:id')
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
                error.response.message,
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
        @Body() wordDto: WordDto,
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
        @Body() wordDto: WordDto,
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
   @Get('search-on-youtube')
   async searchVideo(@Query('word') word: string) {
     if (!word) {
       throw new BadRequestException('Missing word parameter');
     }
 
     try {
       const results = await this.flashCardService.searchVideo(word);
       return results;
     } catch (error) {
       throw new NotFoundException('No video found with the specified word.');
     }
   }
   @Put('update-word-review/:id/:wordIndex')
   async updateWordReview(
     @Param('id') id: string,
     @Param('wordIndex') wordIndex: number,
     @Body() updateWordReviewDto: UpdateWordReviewDto,
   ): Promise<ResponseData<FlashCard>> {
     try {
       const updatedFlashCard = await this.flashCardService.updateWordReview(id, wordIndex, updateWordReviewDto);
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
