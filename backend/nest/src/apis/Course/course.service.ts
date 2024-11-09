import { Readable } from 'stream';
import { GoogleDriveUploader } from 'src/providers/storage/drive/drive.upload';
// import { CourseLessonService } from './course-lesson.service';
import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    Req,
} from '@nestjs/common';
import mongoose, { isValidObjectId, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCourseDto } from './dto/course/create-course.dto';
import { UpdateCourseDto } from './dto/course/update-course.dto';
import {
    Content,
    Course,
    CourseType,
    FillInTheBlank,
    FillInTheBlankProgress,
    Lesson,
    PaymentStatus,
    Purchase,
    Quiz,
    QuizProgress,
    Rating,
    Video,
    VideoProgress,
    WordMatching,
    WordMatchingProgress,
} from './courseSchema/course.schema';
import { ResponseData } from 'src/global/globalClass';
import { HttpStatus } from 'src/global/globalEnum';

import { CreateCourseTypeDto } from './dto/CourseType/create-course-type.dto';
import { CreateQuizDto } from './dto/quiz/createQuiz.dto';
import { UpdateQuizDto } from './dto/quiz/updateQuiz.dto';
import { CreateFillInTheBlankDto } from './dto/fillblank/fillblank.dto';
import { CreateWordMatchingDto } from './dto/wordMatching/createWordMatching.dto';
import { UpdateWordMatchingDto } from './dto/wordMatching/updateWordMatching.dto';
import { CreateVideoDto } from './dto/video/createVideo.dto';
import { updateVideoDto } from './dto/video/updateVideo.dto';
import { updateContentDto } from './dto/content/updateContent.dto';
import { createContentDto } from './dto/content/createContent.dto';
import { createLessonDto } from './dto/lesson/createLesson.dto';
import { updateLessonDto } from './dto/lesson/updateLesson.dto';
import { v4 as uuidv4 } from 'uuid';
const crypto = require('crypto');
import * as qs from 'querystring';
import { User } from '../users/userSchema/user.schema';
import { ContentType } from 'src/utils/constants';
import { generateSlug } from 'src/utils/generateSlug';
import axios from 'axios';
import { transporter } from '../../providers/mail/mailler';
import { createHash } from 'crypto';
import { Vimeo } from '@vimeo/vimeo';
import FirebaseService from 'src/providers/storage/firebase/firebase.service';
import { CreateRatingDto } from './dto/rating/rating.dto';
import { UpdateRatingDto } from './dto/rating/updateRating.dto';
import { log } from 'console';

// import { Vimeo } from 'vimeo';

@Injectable()
export class CourseService {
    // private readonly VIMEO_ACCESS_TOKEN = process.env.VIMEO_ACCESS_TOKEN;

    constructor(
        @InjectModel(CourseType.name)
        private readonly courseTypeModel: mongoose.Model<CourseType>,
        @InjectModel(Course.name)
        private readonly courseModel: mongoose.Model<Course>,
        @InjectModel(Quiz.name)
        private readonly quizModel: mongoose.Model<Quiz>,
        @InjectModel(FillInTheBlank.name)
        private readonly fillInTheBlankModel: mongoose.Model<FillInTheBlank>,
        @InjectModel(WordMatching.name)
        private readonly wordMatchingModel: mongoose.Model<WordMatching>,
        @InjectModel(Video.name)
        private readonly videoModel: mongoose.Model<Video>,
        @InjectModel(Content.name)
        private readonly contentModel: mongoose.Model<Content>,
        @InjectModel(Lesson.name)
        private readonly lessonModel: mongoose.Model<Lesson>,
        @InjectModel(Purchase.name)
        private readonly purchaseModel: mongoose.Model<Purchase>,
        @InjectModel(User.name)
        private readonly userModel: mongoose.Model<User>,
        @InjectModel(VideoProgress.name)
        private videoProgressModel: mongoose.Model<VideoProgress>,
        @InjectModel(QuizProgress.name)
        private quizProgressModel: mongoose.Model<QuizProgress>,
        @InjectModel(WordMatchingProgress.name)
        private wordMatchingProgressModel: mongoose.Model<WordMatchingProgress>,
        @InjectModel(FillInTheBlankProgress.name)
        private fillInTheBlankProgressModel: mongoose.Model<FillInTheBlankProgress>,
        @InjectModel(Rating.name)
        private ratingModel: mongoose.Model<Rating>,
        private readonly googleDriveUploader: GoogleDriveUploader,
        private readonly firebaseService: FirebaseService,
    ) {}

    // Statistic Service
    async countCourse(): Promise<number> {
        return await this.courseModel.countDocuments();
    }

    async countCourseHasSell(): Promise<number> {
        return await this.purchaseModel.countDocuments({
            paymentStatus: PaymentStatus.COMPLETED,
        });
    }

    async totalPurchase(): Promise<string> {
        const total = await this.purchaseModel.aggregate([
            { $match: { paymentStatus: PaymentStatus.COMPLETED } },
            { $group: { _id: null, totalAmount: { $sum: '$amount' } } },
        ]);
        return total.length > 0 ? total[0].totalAmount.toString() : '0';
    }

    /**
     * Service of Course Type form here
     *  */
    // Quiz Service
    // Create a new quiz service
    async createQuizz(createQuizDto: CreateQuizDto): Promise<Quiz> {
        const createdQuiz = new this.quizModel({
            ...createQuizDto,
            content_type: ContentType.QUIZ,
        });
        return createdQuiz.save();
    }
    // Find all quizs service

    async findAllQuizz(): Promise<Quiz[]> {
        return this.quizModel.find().exec();
    }
    // Find  quiz by id service

    async findOneQuizz(id: string): Promise<Quiz> {
        const quiz = await this.quizModel.findById(id).exec();
        if (!quiz) {
            throw Error;
        }
        return quiz;
    }
    // update quiz by id  service

    async updateQuizz(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
        const quiz = await this.quizModel
            .findByIdAndUpdate(id, updateQuizDto, { new: true })
            .exec();
        if (!quiz) {
            throw Error;
        }
        return quiz;
    }

    // remove quiz by id service
    async removeQuizz(id: string): Promise<ResponseData<Course>> {
        try {
            const result = await this.quizModel.findByIdAndDelete(id).exec();
            if (!result) {
                return new ResponseData<Course>(
                    [],
                    HttpStatus.ERROR,
                    'Quizz not found',
                );
            }
            const res = await this.quizModel.findByIdAndDelete(id);

            await this.contentModel.updateMany(
                { quiz: id },
                { $pull: { quiz: id } },
            );

            return new ResponseData<Course>(
                [],
                HttpStatus.SUCCESS,
                'Delete Quizz successfully',
            );
        } catch (error) {
            console.error('Error deleting child topic:', error);
            throw error;
        }
    }

    // Fill The Blank Service Service

    async createFill(
        createFillInTheBlankDto: CreateFillInTheBlankDto,
    ): Promise<FillInTheBlank> {
        const createdFillInTheBlank = new this.fillInTheBlankModel({
            ...createFillInTheBlankDto,
            content_type: ContentType.FILL_IN_THE_BLANK, // Automatically set the content_type
        });
        return createdFillInTheBlank.save();
    }

    async findAllFill(): Promise<FillInTheBlank[]> {
        return this.fillInTheBlankModel.find().exec();
    }

    async findOneFill(id: string): Promise<FillInTheBlank> {
        const fillInTheBlank = await this.fillInTheBlankModel
            .findById(id)
            .exec();
        if (!fillInTheBlank) {
            throw Error;
        }
        return fillInTheBlank;
    }

    async updateFill(
        id: string,
        updateFillInTheBlankDto: any,
    ): Promise<FillInTheBlank> {
        const updatedFillInTheBlank = await this.fillInTheBlankModel
            .findByIdAndUpdate(id, updateFillInTheBlankDto, { new: true })
            .exec();
        if (!updatedFillInTheBlank) {
            throw Error;
        }
        return updatedFillInTheBlank;
    }

    async removeFill(id: string): Promise<ResponseData<FillInTheBlank>> {
        try {
            const deletedFillInTheBlank = await this.fillInTheBlankModel
                .findByIdAndDelete(id)
                .exec();
            if (!deletedFillInTheBlank) {
                return new ResponseData<FillInTheBlank>(
                    [],
                    HttpStatus.ERROR,
                    'Fill the blank data not found',
                );
            }
            const res = await this.fillInTheBlankModel.findByIdAndDelete(id);
            await this.contentModel.updateMany(
                { fill_in_the_blank: id },
                { $pull: { fill_in_the_blank: id } },
            );

            return new ResponseData<FillInTheBlank>(
                [],
                HttpStatus.SUCCESS,
                'Delete Fill the blank successfully',
            );
        } catch (error) {
            console.error('Error deleting child topic:', error);
            throw error;
        }
    }

    // Word Matching Service Service

    async createWordMatching(
        createWordMatchingDto: CreateWordMatchingDto,
    ): Promise<WordMatching> {
        const createdWordMatching = new this.wordMatchingModel({
            ...createWordMatchingDto,
            content_type: ContentType.WORD_MATCHING, // Automatically set the content_type
        });
        return createdWordMatching.save();
    }

    async findAllWordMatching(): Promise<WordMatching[]> {
        return this.wordMatchingModel.find().exec();
    }

    async findOneWordMatching(id: string): Promise<WordMatching> {
        const wordMatching = await this.wordMatchingModel.findById(id).exec();
        if (!wordMatching) {
            throw Error;
        }
        return wordMatching;
    }

    async updateWordMatching(
        id: string,
        updateWordMatchingDto: UpdateWordMatchingDto,
    ): Promise<WordMatching> {
        const wordMatching = await this.wordMatchingModel
            .findByIdAndUpdate(id, updateWordMatchingDto, { new: true })
            .exec();
        if (!wordMatching) {
            throw Error;
        }
        return wordMatching;
    }

    async removeWordMatching(id: string): Promise<ResponseData<WordMatching>> {
        try {
            const result = await this.wordMatchingModel
                .findByIdAndDelete(id)
                .exec();
            if (!result) {
                return new ResponseData<WordMatching>(
                    [],
                    HttpStatus.ERROR,
                    'Word matching data not found',
                );
            }
            const res = await this.wordMatchingModel.findByIdAndDelete(id);
            await this.contentModel.updateMany(
                { word_matching: id },
                { $pull: { word_matching: id } },
            );

            return new ResponseData<WordMatching>(
                [],
                HttpStatus.SUCCESS,
                'Delete Word matching successfully',
            );
        } catch (error) {
            console.error('Error deleting child topic:', error);
            throw error;
        }
    }

    // Video Services

    /**
     * UPLOAD VIDEO TO GOOGLE DRIVE CODE
     */

    // async createVideo(
    //     createVideoDto: CreateVideoDto,
    //     file: Express.Multer.File,
    // ): Promise<Video> {
    //     try {
    //         // Create a readable stream from the file buffer
    //         const fileStream = Readable.from(file.buffer);

    //         const fileId = await this.googleDriveUploader.uploadVideo(
    //             fileStream,
    //             file.originalname,
    //             '1eHh70ah2l2JuqHQlA1riebJZiRS9L20q',
    //         );
    //         const slug = generateSlug(createVideoDto.title);
    //         const videoUrl = this.googleDriveUploader.getVideoUrl(fileId);

    //         const createdVideo = new this.videoModel({
    //             ...createVideoDto,
    //             videoUrl: videoUrl,
    //             content_type: ContentType.VIDEO,
    //             slug: slug,

    //         });

    //         // Save the video document to the database
    //         return await createdVideo.save();
    //     } catch (error) {
    //         // Handle and log the error
    //         console.error('Error creating video:', error);
    //         throw new Error('Failed to create video');
    //     }
    // }

    /**
     * UPLOAD VIDEO LÊN FIREBASE CODE
     */

    async createVideo(
        createVideoDto: CreateVideoDto,
        file: Express.Multer.File,
    ): Promise<Video> {
        try {
            const videoUrl = await this.firebaseService.uploadVideoToFirebase(
                file.buffer,
                file.originalname,
                'videos',
            );

            const slug = generateSlug(createVideoDto.title);

            const createdVideo = new this.videoModel({
                ...createVideoDto,
                videoUrl: videoUrl,
                content_type: ContentType.VIDEO,
                slug: slug,
            });

            return await createdVideo.save();
        } catch (error) {
            console.error('Error creating video:', error);
            throw new Error('Failed to create video');
        }
    }

    async findAllVideo(): Promise<Video[]> {
        return this.videoModel.find().exec();
    }

    async findOneVideo(id: string): Promise<Video> {
        const video = await this.videoModel.findById(id).exec();
        if (!video) {
            throw Error;
        }
        return video;
    }

    async updateVideo(
        id: string,
        updateVideoDto: updateVideoDto,
        file: Express.Multer.File,
    ): Promise<Video> {
        try {
            // Upload the video to Firebase
            const videoUrl = await this.firebaseService.uploadVideoToFirebase(
                file.buffer,
                file.originalname,
                'videos',
            );

            const videoUpdate = {
                ...updateVideoDto,
                videoUrl: videoUrl,
            };

            const updatedVideo = await this.videoModel.findByIdAndUpdate(
                id,
                videoUpdate,
                { new: true },
            );

            return updatedVideo;
        } catch (error) {
            console.error('Error updating video:', error);
            throw new Error('Failed to update video');
        }
    }

    async removeVideo(id: string): Promise<ResponseData<Video>> {
        try {
            const result = await this.videoModel.findByIdAndDelete(id).exec();
            if (!result) {
                return new ResponseData<Video>(
                    [],
                    HttpStatus.ERROR,
                    'Video not found',
                );
            }
            const res = await this.videoModel.findByIdAndDelete(id);
            await this.contentModel.updateMany(
                { video: id },
                { $pull: { video: id } },
            );
            return new ResponseData<Video>(
                [],
                HttpStatus.SUCCESS,
                'Delete video successfully',
            );
        } catch (error) {
            console.error('Error deleting video:', error);
            throw error;
        }
    }

    // Video Progress
    async updateProgress(videoId: string, progress: number, userId: string) {
        const existingProgress = await this.videoProgressModel
            .findOne({ videoId, userId })
            .exec();

        if (existingProgress && progress <= existingProgress.progress) {
            return existingProgress;
        }

        // Determine if completed
        const completed = progress >= 100;
        const update = { progress, completed };
        const options = { upsert: true, new: true };

        return this.videoProgressModel
            .findOneAndUpdate({ videoId, userId }, update, options)
            .exec();
    }

    async getVideoProgress(userId: string) {
        return this.videoProgressModel.find({ userId }).exec();
    }
    async updateQuizProgress(
        quizId: string,
        correctAnswers: number,
        totalQuestions: number,
        userId: string,
    ) {
        const progress = (correctAnswers / totalQuestions) * 100;
        const completed = progress >= 100;

        const existingProgress = await this.quizProgressModel
            .findOne({ quizId, userId })
            .exec();

        if (existingProgress && progress <= existingProgress.progress) {
            return existingProgress;
        }

        const update = { progress, completed };
        const options = { upsert: true, new: true };

        return this.quizProgressModel
            .findOneAndUpdate({ quizId, userId }, update, options)
            .exec();
    }

    async getQuizProgress(userId: string) {
        return this.quizProgressModel.find({ userId }).exec();
    }

    async updateFillInTheBlankProgress(
        fillInTheBlankId: string,
        progress: number,
        userId: string,
    ) {
        const existingProgress = await this.fillInTheBlankProgressModel
            .findOne({ fillInTheBlankId, userId })
            .exec();

        if (existingProgress && progress <= existingProgress.progress) {
            return existingProgress;
        }

        const completed = progress >= 100;
        const update = { progress, completed };
        const options = { upsert: true, new: true };

        return this.fillInTheBlankProgressModel
            .findOneAndUpdate({ fillInTheBlankId, userId }, update, options)
            .exec();
    }

    async getFillInTheBlankProgress(userId: string) {
        return this.fillInTheBlankProgressModel.find({ userId }).exec();
    }
    async updateWordMatchingProgress(
        wordMatchingId: string,
        progress: number,
        userId: string,
    ) {
        const existingProgress = await this.wordMatchingProgressModel
            .findOne({ wordMatchingId, userId })
            .exec();

        if (existingProgress && progress <= existingProgress.progress) {
            return existingProgress;
        }

        const completed = progress >= 100;
        const update = { progress, completed };
        const options = { upsert: true, new: true };

        return this.wordMatchingProgressModel
            .findOneAndUpdate({ wordMatchingId, userId }, update, options)
            .exec();
    }

    async getWordMatchingProgress(userId: string) {
        return this.wordMatchingProgressModel.findOne({ userId }).exec();
    }

    async getAllProgress(userId: string) {
        const videoProgress = await this.getVideoProgress(userId);
        const quizProgress = await this.getQuizProgress(userId);
        const fillInTheBlankProgress =
            await this.getFillInTheBlankProgress(userId);
        const wordMatchingProgress = await this.getWordMatchingProgress(userId);

        return {
            video: videoProgress,
            quiz: quizProgress,
            fillInTheBlank: fillInTheBlankProgress,
            wordMatching: wordMatchingProgress,
        };
    }
    //Content Service
    async createContent(createContentDto: createContentDto): Promise<Content> {
        createContentDto.slug = generateSlug(createContentDto.title);

        const createdContent = new this.contentModel(createContentDto);
        return createdContent.save();
    }

    async findAllContent(): Promise<Content[]> {
        return this.contentModel
            .find()
            .populate('quiz')
            .populate('fill_in_the_blank')
            .populate('word_matching')
            .populate('video')
            .exec();
    }

    async findOneContent(id: string): Promise<Content> {
        const content = await this.contentModel
            .findById(id)
            .populate('quiz')
            .populate('fill_in_the_blank')
            .populate('word_matching')
            .populate('video')
            .exec();
        if (!content) {
            throw Error;
        }
        return content;
    }

    async updateContent(
        id: string,
        updateContentDto: updateContentDto,
    ): Promise<Content> {
        const updatedContent = await this.contentModel
            .findByIdAndUpdate(id, updateContentDto, { new: true })
            .exec();
        if (!updatedContent) {
            throw Error;
        }
        return updatedContent;
    }
    async addContentToLesson(
        lessonId: string,
        contentId: string,
    ): Promise<Lesson> {
        const lessonObjectId = new Types.ObjectId(lessonId);
        const contentObjectId = new Types.ObjectId(contentId);
        const lesson = await this.lessonModel.findById(lessonObjectId).exec();
        if (!lesson) {
            throw new Error('Lesson not found');
        }
        const content = await this.contentModel
            .findById(contentObjectId)
            .exec();
        if (!content) {
            throw new Error('Content not found');
        }
        if (!lesson.content.includes(contentObjectId)) {
            lesson.content.push(contentObjectId);
            await lesson.save();
        }

        return lesson;
    }

    async addMultipleDataToContent(
        contentId: string,
        dataIds: string[],
    ): Promise<Content> {
        if (!Types.ObjectId.isValid(contentId)) {
            throw new Error('Invalid content ID format');
        }

        const content = await this.contentModel.findById(contentId);
        if (!content) {
            throw new Error('Content not found');
        }
        for (const dataId of dataIds) {
            if (!Types.ObjectId.isValid(dataId)) {
                throw new Error('Invalid data ID format');
            }
            const contentType = await this.inferContentType(dataId);
            if (!contentType) {
                throw new Error(
                    `Content type could not be determined for data ID: ${dataId}`,
                );
            }
            const arrayFieldName = this.getArrayFieldName(contentType);
            if (!arrayFieldName) {
                throw new Error(`Invalid content type for data ID: ${dataId}`);
            }
            if (!content[arrayFieldName].includes(dataId)) {
                content[arrayFieldName].push(dataId);
            }
        }

        // Save updated content
        const updatedContent = await content.save();
        return updatedContent;
    }

    private async inferContentType(
        dataId: string,
    ): Promise<ContentType | null> {
        if (await this.quizModel.exists({ _id: dataId })) {
            return ContentType.QUIZ;
        }
        if (await this.fillInTheBlankModel.exists({ _id: dataId })) {
            return ContentType.FILL_IN_THE_BLANK;
        }
        if (await this.wordMatchingModel.exists({ _id: dataId })) {
            return ContentType.WORD_MATCHING;
        }
        if (await this.videoModel.exists({ _id: dataId })) {
            return ContentType.VIDEO;
        }
        return null;
    }

    private getArrayFieldName(contentType: ContentType): string | null {
        switch (contentType) {
            case ContentType.QUIZ:
                return 'quiz';
            case ContentType.FILL_IN_THE_BLANK:
                return 'fill_in_the_blank';
            case ContentType.WORD_MATCHING:
                return 'word_matching';
            case ContentType.VIDEO:
                return 'video';
            default:
                return null;
        }
    }

    async removeContent(id: string): Promise<ResponseData<Content>> {
        try {
            // Chuyển id thành ObjectId nếu cần
            const objectId = new mongoose.Types.ObjectId(id);

            // Cập nhật các Lesson để xóa contentId từ mảng content
            const updateResult = await this.lessonModel
                .updateMany(
                    { content: objectId },
                    { $pull: { content: objectId } },
                )
                .exec(); // Đảm bảo exec() được sử dụng

            if (updateResult.modifiedCount === 0) {
                console.log('No lessons were updated');
            }

            // Bây giờ xóa Content
            const deletedContent = await this.contentModel
                .findByIdAndDelete(objectId)
                .exec();
            if (!deletedContent) {
                return new ResponseData<Content>(
                    [],
                    HttpStatus.ERROR,
                    'Content not found',
                );
            }

            return new ResponseData<Content>(
                [],
                HttpStatus.SUCCESS,
                'Deleted Content successfully',
            );
        } catch (error) {
            console.error('Error deleting content:', error);
            throw error;
        }
    }
    // Lesson Services
    async createLesson(createLessonDto: createLessonDto): Promise<Lesson> {
        createLessonDto.slug = generateSlug(createLessonDto.title);

        const createdLesson = new this.lessonModel(createLessonDto);
        return createdLesson.save();
    }

    async findAllLesson(): Promise<Lesson[]> {
        const lessons = await this.lessonModel
            .find()
            .populate({
                path: 'content',
                model: 'Content',
                populate: [
                    { path: 'quiz', model: 'Quiz' },
                    { path: 'fill_in_the_blank', model: 'FillInTheBlank' },
                    { path: 'word_matching', model: 'WordMatching' },
                    { path: 'video', model: 'Video' },
                ],
            })
            .exec();
        return lessons;
    }
    async findOneLesson(id: string): Promise<Lesson> {
        const lesson = await this.lessonModel
            .findById(id)
            .populate({
                path: 'content',
                model: 'Content',
                populate: [
                    { path: 'quiz', model: 'Quiz' },
                    { path: 'fill_in_the_blank', model: 'FillInTheBlank' },
                    { path: 'word_matching', model: 'WordMatching' },
                    { path: 'video', model: 'Video' },
                ],
            })
            .exec();
        if (!lesson) {
            throw Error;
        }
        return lesson;
    }

    async updateLesson(
        id: string,
        updateLessonDto: updateLessonDto,
    ): Promise<Lesson> {
        updateLessonDto.slug = generateSlug(updateLessonDto.title);
        const updatedLesson = await this.lessonModel
            .findByIdAndUpdate(id, updateLessonDto, { new: true })
            .exec();
        if (!updatedLesson) {
            throw Error;
        }
        return updatedLesson;
    }

    async removeLesson(id: string): Promise<ResponseData<Lesson>> {
        try {
            // Chuyển id thành ObjectId nếu cần
            const objectId = new mongoose.Types.ObjectId(id);

            // Cập nhật các Course để xóa lessonId từ mảng lessons
            const updateResult = await this.courseModel
                .updateMany(
                    { lessons: objectId },
                    { $pull: { lessons: objectId } },
                )
                .exec();

            if (updateResult.modifiedCount === 0) {
                console.log('No courses were updated');
            }

            // Bây giờ xóa Lesson
            const deletedLesson = await this.lessonModel
                .findByIdAndDelete(objectId)
                .exec();
            if (!deletedLesson) {
                return new ResponseData<Lesson>(
                    [],
                    HttpStatus.ERROR,
                    'Lesson not found',
                );
            }

            return new ResponseData<Lesson>(
                [],
                HttpStatus.SUCCESS,
                'Deleted Lesson successfully',
            );
        } catch (error) {
            console.error('Error deleting lesson:', error);
            throw error;
        }
    }

    //Course Type Service
    // Create Course Type
    async createTypeCourse(course: CreateCourseTypeDto): Promise<CourseType> {
        try {
            const courseType = { ...course };
            const res = await this.courseTypeModel.create(courseType);
            return res;
        } catch (error) {
            console.error('Error create blog:', error);
            throw error;
        }
    }
    // update Course Type
    async updateTypeCourse(
        id: string,
        course: UpdateCourseDto,
    ): Promise<CourseType> {
        try {
            const courseType = { ...course };
            const res = await this.courseTypeModel.findByIdAndUpdate(
                id,
                courseType,
            );
            return res;
        } catch (error) {
            console.error('Error create blog:', error);
            throw error;
        }
    }
    // get All Course Type
    async getAllCourseTypes(): Promise<CourseType[]> {
        try {
            const res = await this.courseTypeModel.find();
            return res;
        } catch (error) {
            throw error;
        }
    }
    // get Course Type by Id
    async getCourseTypesById(id: string): Promise<CourseType> {
        try {
            const res = await this.courseTypeModel.findById(id);
            return res;
        } catch (error) {
            throw error;
        }
    }
    // Delete course type
    async deleteCourseTypesById(id: string): Promise<ResponseData<CourseType>> {
        try {
            const result = await this.courseTypeModel.findByIdAndDelete(id);

            if (!result) {
                return new ResponseData<CourseType>(
                    [],
                    HttpStatus.ERROR,
                    'Course Type not found',
                );
            }
            const res = await this.courseTypeModel.findByIdAndDelete(id);
            return new ResponseData<CourseType>(
                [],
                HttpStatus.SUCCESS,
                'Delete Course Type successfully',
            );
        } catch (error) {
            console.error('Error deleting video:', error);
            throw error;
        }
    }

    // Course Service
    // Create a new Course
    async createCourse(
        createCourseDto: CreateCourseDto,
        file: Express.Multer.File,
    ): Promise<Course> {
        const fileStream = Readable.from(file.buffer);
        createCourseDto.slug = generateSlug(createCourseDto.title);
        createCourseDto.discount = createCourseDto.discount || 0;

        const fileId = await this.googleDriveUploader.uploadImage(
            fileStream,
            file.originalname,
            '1eHh70ah2l2JuqHQlA1riebJZiRS9L20q',
        );
        const thumbnail = this.googleDriveUploader.getThumbnailUrl(fileId);
        const userWithAvatar = {
            ...createCourseDto,
            thumbnail: thumbnail,
        };

        const createdCourse = new this.courseModel(userWithAvatar);
        return await createdCourse.save();
    }

    async findAllCourse(
        page: number = 1,
        limit: number = 10,
    ): Promise<Course[]> {
        const skip = (page - 1) * limit;
        return this.courseModel
            .find()
            .skip(skip)
            .limit(limit)
            .populate('typeCourse')
            .populate({
                path: 'lessons',
                model: 'Lesson',
                populate: [
                    {
                        path: 'content',
                        model: 'Content',
                        populate: [
                            { path: 'quiz', model: 'Quiz' },
                            {
                                path: 'fill_in_the_blank',
                                model: 'FillInTheBlank',
                            },
                            { path: 'word_matching', model: 'WordMatching' },
                            { path: 'video', model: 'Video' },
                        ],
                    },
                ],
            })
            .populate('comments')
            .exec();
    }

    async findOneCourse(id: string): Promise<Course> {
        const course = await this.courseModel
            .findById(id)
            .populate('typeCourse')
            .populate({
                path: 'lessons',
                model: 'Lesson',
                populate: [
                    {
                        path: 'content',
                        model: 'Content',
                        populate: [
                            { path: 'quiz', model: 'Quiz' },
                            {
                                path: 'fill_in_the_blank',
                                model: 'FillInTheBlank',
                            },
                            { path: 'word_matching', model: 'WordMatching' },
                            { path: 'video', model: 'Video' },
                        ],
                    },
                ],
            })
            .populate('comments')
            .exec();
        if (!course) {
            throw new Error(`Course with ID ${id} not found`);
        }
        return course;
    }
    async findOneCourseBySlug(slug: string): Promise<Course> {
        const course = await this.courseModel
            .findOne({ slug })
            .populate('typeCourse')
            .populate({
                path: 'lessons',
                model: 'Lesson',
                populate: [
                    {
                        path: 'content',
                        model: 'Content',
                        populate: [
                            { path: 'quiz', model: 'Quiz' },
                            {
                                path: 'fill_in_the_blank',
                                model: 'FillInTheBlank',
                            },
                            { path: 'word_matching', model: 'WordMatching' },
                            { path: 'video', model: 'Video' },
                        ],
                    },
                ],
            })
            .populate('comments')
            .exec();
        if (!course) {
            throw new Error(`Course with slug ${slug} not found`);
        }
        return course;
    }
    async updateCourse(
        id: string,
        updateCourseDto: UpdateCourseDto,
        file?: Express.Multer.File,
    ): Promise<Course> {
        try {
            const existingCourse = await this.courseModel.findById(id).exec();
            if (!existingCourse) {
                throw new NotFoundException('Course not found');
            }
            updateCourseDto.slug = generateSlug(updateCourseDto.title);

            if (file) {
                const fileStream = Readable.from(file.buffer);
                const fileId = await this.googleDriveUploader.uploadImage(
                    fileStream,
                    file.originalname,
                    '1eHh70ah2l2JuqHQlA1riebJZiRS9L20q',
                );
                const thumbnailUrl =
                    this.googleDriveUploader.getThumbnailUrl(fileId);
                updateCourseDto.thumbnail = thumbnailUrl;
            } else {
                updateCourseDto.thumbnail = existingCourse.thumbnail;
            }

            const updatedCourse = await this.courseModel
                .findByIdAndUpdate(id, updateCourseDto, { new: true })
                .exec();

            return updatedCourse;
        } catch (error) {
            console.error('Error updating course:', error);
            throw error;
        }
    }

    async removeCourse(id: string): Promise<ResponseData<Course>> {
        try {
            const deletedCourse = await this.courseModel
                .findByIdAndDelete(id)
                .exec();
            if (!deletedCourse) {
                return new ResponseData<Course>(
                    [],
                    HttpStatus.ERROR,
                    'Course not found',
                );
            }
            const res = await this.courseModel.findByIdAndDelete(id);
            return new ResponseData<Course>(
                [],
                HttpStatus.SUCCESS,
                'Delete Course successfully',
            );
        } catch (error) {
            console.error('Error deleting video:', error);
            throw error;
        }
    }

    async addLessontoCourse(Course: string, LessonId: string): Promise<Course> {
        const courseObjectId = new Types.ObjectId(Course);
        const lessonObjectId = new Types.ObjectId(LessonId);
        const course = await this.courseModel.findById(courseObjectId).exec();
        if (!course) {
            throw new Error('Course not found');
        }
        const lesson = await this.lessonModel.findById(lessonObjectId).exec();
        if (!lesson) {
            throw new Error('Lesson not found');
        }
        if (!course.lessons.includes(lessonObjectId)) {
            course.lessons.push(lessonObjectId);
            await course.save();
        }

        return course;
    }

    async createPurchase(
        userId: Types.ObjectId,
        courseId: Types.ObjectId,
    ): Promise<any> {
        // Check if the user exists
        const user = await this.userModel.findById(userId).select('email');
        if (!user) {
            throw new InternalServerErrorException('User does not exist');
        }

        // Check if the course exists
        const course = await this.courseModel
            .findById(courseId)
            .select('price discount');
        if (!course) {
            throw new InternalServerErrorException('Course does not exist');
        }

        const coursePrice = course.price;
        if (coursePrice === undefined) {
            throw new InternalServerErrorException('Course price is not set');
        }

        // Calculate final price
        const finalPrice = course.discount
            ? coursePrice - course.discount
            : coursePrice;

        // Check for existing purchase with COMPLETED status
        const existingPurchase = await this.purchaseModel.findOne({
            user: userId,
            course: courseId,
            paymentStatus: PaymentStatus.COMPLETED,
        });

        if (existingPurchase) {
            throw new InternalServerErrorException(
                'User has already registered for this course',
            );
        }

        // Check for existing PENDING purchase
        let purchase;
        const pendingPurchase = await this.purchaseModel.findOne({
            user: userId,
            course: courseId,
            paymentStatus: PaymentStatus.PENDING,
        });

        if (pendingPurchase) {
            // Update existing PENDING purchase
            purchase = pendingPurchase;
            purchase.purchaseKey = uuidv4();
            purchase.purchaseDate = new Date();
            purchase.expiryDate = new Date(
                new Date().setFullYear(new Date().getFullYear() + 1),
            );
        } else {
            // Create new purchase
            purchase = new this.purchaseModel({
                user: userId,
                course: courseId,
                purchaseKey: uuidv4(),
                purchaseDate: new Date(),
                expiryDate: new Date(
                    new Date().setFullYear(new Date().getFullYear() + 1),
                ),
                paymentMethod: 'Momo',
                paymentStatus: PaymentStatus.PENDING,
            });
        }

        const savedPurchase = await purchase.save();

        // MoMo Payment integration
        const baseUrl = process.env.BASE_URL || 'http://localhost:4000';
        const accessKey = 'F8BBA842ECF85';
        const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
        const orderInfo = 'Pay with MoMo';
        const partnerCode = 'MOMO';
        const redirectUrl = `${baseUrl}/course/callback/${user.email}/${purchase.purchaseKey}`;
        const ipnUrl = `${baseUrl}/course/callback`;
        const requestType = 'payWithMethod';
        const amount = finalPrice.toString();
        const orderId = `${partnerCode}${new Date().getTime()}`;
        const requestId = orderId;
        const extraData = '';

        // Generate signature
        const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
        const signature = crypto
            .createHmac('sha256', secretKey)
            .update(rawSignature)
            .digest('hex');

        const requestBody = {
            partnerCode,
            partnerName: 'Test',
            storeId: 'MomoTestStore',
            requestId,
            amount,
            orderId,
            orderInfo,
            redirectUrl,
            ipnUrl,
            lang: 'vi',
            requestType,
            autoCapture: true,
            extraData,
            orderGroupId: '',
            signature,
        };

        const options = {
            method: 'POST',
            url: 'https://test-payment.momo.vn/v2/gateway/api/create',
            headers: {
                'Content-Type': 'application/json',
            },
            data: requestBody,
        };

        try {
            const response = await axios(options);
            return {
                status: response.status,
                data: response.data,
                paymentUrl: response.data.payUrl,
            };
        } catch (error) {
            console.error('MoMo Payment Error:', error);
            throw new InternalServerErrorException('MoMo payment error');
        }
    }

    async findPurchaseByKey(email: string, purchaseKey: string) {
        return this.purchaseModel.findOne({
            user: email,
            purchaseKey: purchaseKey,
        });
    }
    async createPurchaseAndPaymentUrl(
        userId: Types.ObjectId,
        courseId: Types.ObjectId,
        bankCode: string,
        ipAddr: string,
    ): Promise<string> {
        // Validate ObjectId
        if (!isValidObjectId(userId) || !isValidObjectId(courseId)) {
            throw new BadRequestException('Invalid UserId or CourseId');
        }

        // Check if the user exists
        const userExists = await this.userModel.exists({ _id: userId });
        if (!userExists) {
            throw new InternalServerErrorException('User does not exist');
        }

        // Check if the course exists and get its price
        const course = await this.courseModel.findById(courseId);
        if (!course) {
            throw new InternalServerErrorException('Course does not exist');
        }

        const coursePrice = course.price;
        if (!coursePrice) {
            throw new InternalServerErrorException('Course price is not set');
        }

        // Calculate final price based on discount
        let finalPrice: number;
        const discountPrice = course.discount;
        if (discountPrice) {
            finalPrice = coursePrice - discountPrice;
        } else {
            finalPrice = coursePrice;
        }

        // Check if the user has already registered for this course
        let existingPurchase = await this.purchaseModel.findOne({
            user: userId,
            course: courseId,
            paymentStatus: { $in: ['COMPLETED', 'PENDING'] },
        });

        if (
            existingPurchase &&
            existingPurchase.paymentStatus === 'COMPLETED'
        ) {
            throw new InternalServerErrorException(
                'User has already completed registration for this course',
            );
        }

        // If purchase exists with status PENDING, reuse it, otherwise create a new purchase
        if (!existingPurchase) {
            const purchaseKey = uuidv4();
            existingPurchase = new this.purchaseModel({
                user: userId,
                course: courseId,
                purchaseKey,
                purchaseDate: new Date(),
                expiryDate: new Date(
                    new Date().setFullYear(new Date().getFullYear() + 1),
                ),
                paymentMethod: 'VNPay',
                paymentStatus: PaymentStatus.PENDING,
            });
            await existingPurchase.save();
        }

        // Create the VNPay payment URL
        const user = await this.userModel.findById(userId);
        const tmnCode = process.env.VNP_TMN_CODE;
        const secretKey = process.env.VNP_HASH_SECRET;
        const vnpUrl = process.env.VNP_URL;
        const returnUrl = `http://localhost:4000/course/callbackvnpay/${user.email}/${existingPurchase.purchaseKey}`;
        const date = new Date();
        const padZero = (num: number) => num.toString().padStart(2, '0');
        const createDate = `${date.getFullYear()}${padZero(date.getMonth() + 1)}${padZero(date.getDate())}${padZero(date.getHours())}${padZero(date.getMinutes())}${padZero(date.getSeconds())}`;
        const orderId = `${padZero(date.getHours())}${padZero(date.getMinutes())}${padZero(date.getSeconds())}`;
        const locale = 'vn';
        const currCode = 'VND';

        let vnp_Params: any = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: tmnCode,
            vnp_Locale: locale,
            vnp_CurrCode: currCode,
            vnp_TxnRef: orderId,
            vnp_OrderInfo: 'thanhtoan',
            vnp_OrderType: 'billpayment',
            vnp_Amount: finalPrice * 100,
            vnp_ReturnUrl: returnUrl,
            vnp_IpAddr: ipAddr,
            vnp_CreateDate: createDate,
        };

        if (bankCode) {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        // Sort the parameters before signing
        vnp_Params = this.sortObject(vnp_Params);
        const signData = qs.stringify(vnp_Params);
        const hmac = crypto.createHmac('sha512', secretKey);
        const signed = hmac.update(signData, 'utf-8').digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;

        const paymentUrl = `${vnpUrl}?${qs.stringify(vnp_Params)}`;
        return paymentUrl;
    }

    private sortObject(obj: any): any {
        const sorted: any = {};
        const keys = Object.keys(obj).sort();
        for (const key of keys) {
            sorted[key] = obj[key];
        }
        return sorted;
    }
    async getPurchasesByUserId(userId: Types.ObjectId): Promise<Purchase[]> {
        const purchases = await this.purchaseModel
            .find({ user: userId, paymentStatus: PaymentStatus.COMPLETED })
            .populate('user')
            .populate('course')
            .exec();
        if (!purchases || purchases.length === 0) {
            throw new InternalServerErrorException(
                'No purchases found for this user',
            );
        }

        return purchases;
    }
    async sendSuccessEmail(email: string, key: string): Promise<void> {
        const mailOptions = {
            from: '<hieu@78544@gmail.com>',
            to: email,
            subject: 'Password Reset Request',
            html: `
                <p>Active key : ${key}</p>
              `,
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Failed to send password reset email:', error);
            throw new Error('Failed to send password reset email');
        }
    }
    async checkUserPurchase(
        userId: string,
        courseId: string,
    ): Promise<{ paymentStatus: string }> {
        // Find the user by ID
        const user = await this.userModel.findById(userId);

        // Handle case where user is not found
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        // Find the purchase record for the given user and course
        const purchase = await this.purchaseModel.findOne({
            user: userId,
            course: courseId,
        });

        // Log the user information for debugging
        console.log('User Info:', user);

        // Handle case where purchase is not found
        if (!purchase) {
            return { paymentStatus: 'NOT_FOUND' }; // User has not purchased the course
        }

        // Return the payment status from the found purchase record
        return { paymentStatus: purchase.paymentStatus };
    }

    async completePurchase(purchaseKey: string): Promise<Purchase> {
        const purchase = await this.purchaseModel.findOneAndUpdate(
            { purchaseKey, paymentStatus: PaymentStatus.PENDING },
            { $set: { paymentStatus: PaymentStatus.COMPLETED } },
            { new: true },
        );
        if (!purchase) {
            throw new Error('Purchase not found or already completed');
        }

        return purchase;
    }

    async getAllPurchases(): Promise<Purchase[]> {
        const purchases = await this.purchaseModel
            .find()
            .populate('user')
            .populate('course')
            .exec();

        if (!purchases || purchases.length === 0) {
            throw new InternalServerErrorException('No purchases found');
        }

        return purchases;
    }

    async create(createRatingDto: CreateRatingDto) {
        const existingRating = await this.ratingModel.findOne({
            userId: new Types.ObjectId(createRatingDto.userId),
            courseId: new Types.ObjectId(createRatingDto.courseId),
        });

        if (existingRating) {
            throw new BadRequestException(
                'Rating already exists for this user and course',
            );
        }
        const newRating = new this.ratingModel({
            ...createRatingDto,
            userId: new Types.ObjectId(createRatingDto.userId),
            courseId: new Types.ObjectId(createRatingDto.courseId),
        });
        await newRating.save();
        return newRating;
    }

    async update(ratingId: string, updateRatingDto: UpdateRatingDto) {
        const rating = await this.ratingModel.findByIdAndUpdate(
            ratingId,
            {
                ...updateRatingDto,
                userId: new Types.ObjectId(updateRatingDto.userId),
                courseId: new Types.ObjectId(updateRatingDto.courseId),
            },
            { new: true },
        );
        if (!rating) {
            throw new NotFoundException('Rating not found');
        }
        return rating;
    }

    async delete(ratingId: string) {
        const result = await this.ratingModel.findByIdAndDelete(ratingId);
        if (!result) {
            throw new NotFoundException('Rating not found');
        }
        return result;
    }

    async getCourseAverageRating(courseId: string) {
        const courseObjectId = new Types.ObjectId(courseId);

        const ratings = await this.ratingModel.aggregate([
            { $match: { courseId: courseObjectId } },
            {
                $group: {
                    _id: '$courseId',
                    averageRating: { $avg: '$rating' },
                    totalRatings: { $sum: 1 },
                },
            },
        ]);
        if (ratings.length === 0) {
            return { averageRating: 0, totalRatings: 0 }; // Không có đánh giá
        }

        return {
            averageRating: ratings[0].averageRating.toFixed(2), // Định dạng với 2 chữ số thập phân
            totalRatings: ratings[0].totalRatings,
        };
    }
}
