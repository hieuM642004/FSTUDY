import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import * as moment from 'moment-timezone';
import {
    FlashCard,
    FlashCardDocument,
} from './FlashCardSchema/FlashCard.schema';
import { CreateFlashCardDto, WordDto } from './dto/CreateFlashCard.dto';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { map, catchError } from 'rxjs/operators';
import { UpdateWordReviewDto } from './dto/UpdateWordReviewDto';
import { transporter } from 'src/providers/mail/mailler';
import { User } from '../users/userSchema/user.schema';
import * as mjml from 'mjml';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
@Injectable()
export class FlashCardService {
    constructor(
        @InjectModel(FlashCard.name)
        private readonly flashCardModel: Model<FlashCardDocument>,
        @InjectModel(User.name)
        private readonly userModel: mongoose.Model<User>,
        private readonly httpService: HttpService,
    ) {}
    async getFlashCards(): Promise<FlashCard[]> {
        try {
            return await this.flashCardModel.find().populate('userId').exec();
        } catch (error) {
            console.error(error);
        }
    }
    async getFlashCardById(id: string): Promise<FlashCard[]> {
        try {
            const flashCard = await this.flashCardModel.findById(id);
            if (!flashCard) {
                throw new HttpException(
                    `FlashCard with ID '${id}' not found`,
                    HttpStatus.NOT_FOUND,
                );
            }
            return [flashCard];
        } catch (error) {
            console.error(error);
        }
    }
    async getFlashCardsOfUser(idUser: string): Promise<any> {
        try {
            const flashCard = await this.flashCardModel.find({
                userId: idUser,
            });
            if (!flashCard) {
                throw new HttpException(
                    `FlashCard with ID '${idUser}' not found`,
                    HttpStatus.NOT_FOUND,
                );
            }
            return flashCard;
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
    async addWordToFlashCard(id: string, wordDto: WordDto): Promise<FlashCard> {
        const flashCard = await this.flashCardModel.findById(id);
        if (!flashCard) {
            throw new HttpException(
                `FlashCard with ID '${id}' not found`,
                HttpStatus.NOT_FOUND,
            );
        }

        flashCard.words.push(wordDto);
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

        flashCard.words[wordIndex] = wordDto;
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

    searchYouTube(query: string): Observable<any[]> {
        const params = {
            q: query,
            part: 'id,snippet',
            type: 'video',
            order: 'relevance',
            key: 'AIzaSyCH8l3BK-JCGRe6p8DmZZg5D17_anLHTfk',
        };
        console.log(
            'AIzaSyCH8l3BK-JCGRe6p8DmZZg5D17_anLHTfk',
            process.env.youtubeApiUrl,
        );

        return this.httpService
            .get('https://www.googleapis.com/youtube/v3/search', { params })
            .pipe(
                map((response: AxiosResponse) => response.data.items),
                catchError((error) => {
                    console.error('Error calling YouTube API:', error);
                    return [];
                }),
            );
    }

    async getVideoCaptions(videoId: string): Promise<any[]> {
        const url = `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${'AIzaSyCH8l3BK-JCGRe6p8DmZZg5D17_anLHTfk'}`;
        const response = await this.httpService.get(url).toPromise();
        return response.data.items;
    }

    async downloadCaption(captionId: string): Promise<string> {
        const url = `https://www.googleapis.com/youtube/v3/captions/${captionId}?tfmt=ttml&key=${'AIzaSyCH8l3BK-JCGRe6p8DmZZg5D17_anLHTfk'}`;
        const response = await this.httpService.get(url).toPromise();
        return response.data;
    }

    findWordInTranscript(transcript: string, word: string): number[] {
        const timestamps = [];
        const transcriptLines = transcript.split('\n');

        transcriptLines.forEach((line, index) => {
            if (line.toLowerCase().includes(word.toLowerCase())) {
                timestamps.push(index);
            }
        });

        return timestamps;
    }

    async searchVideo(word: string): Promise<any> {
        const videos = await this.searchYouTube(word).toPromise();
        const results = [];

        for (const video of videos) {
            const videoId = video.id.videoId;
            const captions = await this.getVideoCaptions(videoId);

            if (captions.length > 0) {
                const captionId = captions[0].id;
                const transcript = await this.downloadCaption(captionId);

                const timestamps = this.findWordInTranscript(transcript, word);
                if (timestamps.length > 0) {
                    const firstTimestamp = timestamps[0];
                    const videoUrl = `https://www.youtube.com/watch?v=${videoId}&t=${Math.floor(firstTimestamp)}s`;
                    results.push({
                        video_url: videoUrl,
                        timestamp: Math.floor(firstTimestamp),
                    });
                }
            }
        }

        if (results.length === 0) {
            throw new Error('No video found with the specified word.');
        }

        return results;
    }
    async updateWordReview(
        id: string,
        wordIndex: number,
        updateWordReviewDto: UpdateWordReviewDto,
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

        const word = flashCard.words[wordIndex];

        word.reviewCount = updateWordReviewDto.reviewCount;
        word.reviewInterval = updateWordReviewDto.reviewInterval;
        word.lastReviewed = updateWordReviewDto.lastReviewed;
        word.nextReviewDate = updateWordReviewDto.nextReviewDate;

        flashCard.markModified(`words.${wordIndex}`);

        return await flashCard.save();
    }

    //   @Cron('0 * * * *')
    @Cron('0 */12 * * *')
    async notifyUsersToReviewWords() {
        const now = new Date();
        console.log('Current time:', now);

        const flashCards = await this.flashCardModel
            .find({})
            .populate('userId')
            .exec();

        const flashCardsToNotify = flashCards.filter((flashCard) => {
            return flashCard.words.some((word) => {
                const nextReviewDate = moment(
                    word.nextReviewDate,
                    'DD/MM/YY HH:mm:ss',
                ).toDate();

                console.log('Next Review Date (raw):', word.nextReviewDate);
                console.log('Next Review Date (converted):', nextReviewDate);

                return nextReviewDate <= now;
            });
        });

        if (flashCardsToNotify.length === 0) {
            console.log('No flashcards to notify at this time.');
            return;
        }

        for (const flashCard of flashCardsToNotify) {
            if (!flashCard.userId || !(flashCard.userId as any).email) {
                console.error(
                    `User or user email is missing for flashcard: ${flashCard.nameCard}`,
                );
                continue;
            }

            try {
                await this.sendNotification(flashCard.userId, flashCard);
                console.log(
                    `Successfully sent email notification for flashcard: ${flashCard.nameCard}`,
                );
            } catch (error) {
                console.error(
                    `Failed to send notification for flashcard: ${flashCard.nameCard}`,
                    error,
                );
            }
        }
    }

    private async sendNotification(user: any, flashCard: FlashCard) {
        const flashCardUrl = `http://localhost:3000/flashcard/${flashCard._id}#review`;

        if (!user || !user.email) {
            console.error(
                'User or email is missing, cannot send notification.',
            );
            throw new Error('User or email is missing');
        }

        const formattedNextReviewDate = moment(
            flashCard.words[0].nextReviewDate,
            'DD/MM/YY HH:mm:ss',
        ).format('DD/MM/YY HH:mm:ss');

        // Load MJML template from file
        const mjmlTemplate = fs.readFileSync(
            'src/providers/mail/templates/reminder.mjml',
            'utf8',
        );

        // Compile template with Handlebars
        const template = handlebars.compile(mjmlTemplate);

        // Render MJML template to HTML
        const htmlContent = mjml(
            template({
                name: user.fullname || 'người dùng',
                cardName: flashCard.nameCard,
                nextReviewDate: formattedNextReviewDate,
                reviewLink: flashCardUrl,
            }),
        ).html;

        const mailOptions = {
            from: 'hieu@78544@gmail.com',
            to: user.email,
            subject: 'Nhắc nhở ôn tập từ vựng',
            html: htmlContent,
        };

        try {
            console.log(
                `Sending email to ${user.email} for flashcard: ${flashCard.nameCard}`,
            );
            await transporter.sendMail(mailOptions);
            console.log(`Email successfully sent to ${user.email}`);
        } catch (error) {
            console.error(
                `Failed to send reminder email to ${user.email}:`,
                error,
            );
            throw new Error('Failed to send reminder email');
        }
    }
}
