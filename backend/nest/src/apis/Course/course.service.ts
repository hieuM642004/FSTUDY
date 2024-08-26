import { Readable } from 'stream';
import { GoogleDriveUploader } from 'src/providers/storage/drive/drive.upload';
// import { CourseLessonService } from './course-lesson.service';
import { Injectable, InternalServerErrorException, Req } from '@nestjs/common';
import mongoose, { Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCourseDto } from './dto/course/create-course.dto';
import { UpdateCourseDto } from './dto/course/update-course.dto';
import {
    Content,
    Course,
    CourseType,
    FillInTheBlank,
    Lesson,
    PaymentStatus,
    Purchase,
    Quiz,
    Video,
    WordMatching,
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

@Injectable()
export class CourseService {
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
        private readonly googleDriveUploader: GoogleDriveUploader,
    ) {}
    /**
     * Service of Course Type form here
     *  */
    // Quiz Service
    // Create a new quiz service
    async createQuizz(createQuizDto: CreateQuizDto): Promise<Quiz> {
        const createdQuiz = new this.quizModel(createQuizDto);
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
        try {
            const createdFillInTheBlankDto = { ...createFillInTheBlankDto };
            const res = await this.fillInTheBlankModel.create(
                createdFillInTheBlankDto,
            );
            return res;
        } catch (error) {
            console.error('Error create question:', error);
            throw error;
        }
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
        const createdWordMatching = new this.wordMatchingModel(
            createWordMatchingDto,
        );
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

    async createVideo(
        createVideoDto: CreateVideoDto,
        file: Express.Multer.File,
    ): Promise<Video> {
        try {
            const fileStream = Readable.from(file.buffer);

            const fileId = await this.googleDriveUploader.uploadVideo(
                fileStream,
                file.originalname,
                '1eHh70ah2l2JuqHQlA1riebJZiRS9L20q',
            );
            const videoUrl = this.googleDriveUploader.getVideoUrl(fileId);
            const userWithAvatar = {
                ...createVideoDto,
                videoUrl: videoUrl,
            };

            const createdVideo = new this.videoModel(userWithAvatar);
            return await createdVideo.save();
        } catch (error) {
            throw error;
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
            const fileStream = Readable.from(file.buffer);

            const fileId = await this.googleDriveUploader.uploadVideo(
                fileStream,
                file.originalname,
                '1eHh70ah2l2JuqHQlA1riebJZiRS9L20q',
            );
            const videoUrl = this.googleDriveUploader.getThumbnailUrl(fileId);
            const videoUpload = {
                ...updateVideoDto,
                videoUrl: videoUrl,
            };

            const createdVideo = await this.videoModel.findByIdAndUpdate(
                id,
                videoUpload,
            );
            return createdVideo.save();
        } catch (error) {
            throw error;
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

    //Content Service
    async createContent(createContentDto: createContentDto): Promise<Content> {
        createContentDto.slug = generateSlug(createContentDto.content_type);

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
    async addDataToContent(
        contentId: string,
        contentType: ContentType,
        dataId: string,
    ): Promise<Content> {
        if (!Types.ObjectId.isValid(dataId)) {
            throw new Error('Invalid data ID format');
        }
        await this.checkDataIdExists(contentType, dataId);

        const arrayFieldName = this.getArrayFieldName(contentType);

        if (!arrayFieldName) {
            throw new Error('Invalid content type');
        }
        const updatedContent = await this.contentModel.findByIdAndUpdate(
            contentId,
            { $addToSet: { [arrayFieldName]: dataId } },
            { new: true },
        );

        if (!updatedContent) {
            throw new Error('Content not found');
        }

        return updatedContent;
    }

    private async checkDataIdExists(
        contentType: ContentType,
        dataId: string,
    ): Promise<void> {
        switch (contentType) {
            case ContentType.QUIZ:
                const quizExists = await this.quizModel.findById(dataId).exec();
                if (!quizExists) {
                    throw new Error('Quiz not found');
                }
                break;
            case ContentType.FILL_IN_THE_BLANK:
                const fillInTheBlankExists = await this.fillInTheBlankModel
                    .findById(dataId)
                    .exec();
                if (!fillInTheBlankExists) {
                    throw new Error('Fill-in-the-blank not found');
                }
                break;
            case ContentType.WORD_MATCHING:
                const wordMatchingExists = await this.wordMatchingModel
                    .findById(dataId)
                    .exec();
                if (!wordMatchingExists) {
                    throw new Error('Word-matching not found');
                }
                break;
            case ContentType.VIDEO:
                const videoExists = await this.videoModel
                    .findById(dataId)
                    .exec();
                if (!videoExists) {
                    throw new Error('Video not found');
                }
                break;
            default:
                throw new Error('Invalid content type');
        }
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

    async findAllCourse(): Promise<Course[]> {
        return this.courseModel
            .find()
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

    async updateCourse(
        id: string,
        updateCourseDto: UpdateCourseDto,
        file: Express.Multer.File,
    ): Promise<Course> {
        const fileStream = Readable.from(file.buffer);
        updateCourseDto.slug = generateSlug(updateCourseDto.title);

        const fileId = await this.googleDriveUploader.uploadImage(
            fileStream,
            file.originalname,
            '1eHh70ah2l2JuqHQlA1riebJZiRS9L20q',
        );
        const thumbnail = this.googleDriveUploader.getThumbnailUrl(fileId);
        const courseWithAvatar = {
            ...updateCourseDto,
            thumbnail: thumbnail,
        };

        const createdVideo = await this.courseModel.findByIdAndUpdate(
            id,
            courseWithAvatar,
        );
        return createdVideo.save();
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
    // async  momoPayment() {
    //     var accessKey = 'F8BBA842ECF85';
    //     var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    //     var orderInfo = 'pay with MoMo';
    //     var partnerCode = 'MOMO';
    //     var redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
    //     var ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
    //     var requestType = 'payWithMethod';
    //     var amount = '50000';
    //     var orderId = partnerCode + new Date().getTime();
    //     var requestId = orderId;
    //     var extraData = '';
    //     var orderGroupId = '';
    //     var autoCapture = true;
    //     var lang = 'vi';

    //     // Generate the raw signature
    //     var rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    //     console.log('--------------------RAW SIGNATURE----------------');
    //     console.log(rawSignature);

    //     // Create the signature
    //     var signature = crypto.createHmac('sha256', secretKey)
    //         .update(rawSignature)
    //         .digest('hex');
    //     console.log('--------------------SIGNATURE----------------');
    //     console.log(signature);

    //     // Create the request body
    //     const requestBody = {
    //         partnerCode: partnerCode,
    //         partnerName: 'Test',
    //         storeId: 'MomoTestStore',
    //         requestId: requestId,
    //         amount: amount,
    //         orderId: orderId,
    //         orderInfo: orderInfo,
    //         redirectUrl: redirectUrl,
    //         ipnUrl: ipnUrl,
    //         lang: lang,
    //         requestType: requestType,
    //         autoCapture: autoCapture,
    //         extraData: extraData,
    //         orderGroupId: orderGroupId,
    //         signature: signature,
    //     };

    //     // Define the request options
    //     const options = {
    //         method: 'POST',
    //         url: 'https://test-payment.momo.vn/v2/gateway/api/create',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Content-Length': Buffer.byteLength(JSON.stringify(requestBody)),
    //         },
    //         data: JSON.stringify(requestBody),
    //     };

    //     try {
    //         // Make the request and handle the response
    //         const response = await axios(options);
    //         return {
    //             status: response.status,
    //             data: response.data
    //         };
    //     } catch (error) {
    //         console.error('Error:', error);
    //         return {
    //             status: 500,
    //             message: 'Error'
    //         };
    //     }
    // }
    async createPurchase(
        userId: Types.ObjectId,
        courseId: Types.ObjectId,
    ): Promise<any> {
        // Check if the user exists
        const userExists = await this.userModel.exists({ _id: userId });
        if (!userExists) {
            throw new InternalServerErrorException('User does not exist');
        }

        // Get the user details
        const user = await this.userModel.findById(userId);

        // Check if the course exists and get its price
        const course = await this.courseModel
            .findById(courseId)
            .select('price');
        if (!course) {
            throw new InternalServerErrorException('Course does not exist');
        }

        const coursePrice = course.price;
        if (!coursePrice) {
            throw new InternalServerErrorException('Course price is not set');
        }

        // Check if the user has already registered for this course
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

        // Create a new purchase record
        const purchaseKey = uuidv4();
        const newPurchase = new this.purchaseModel({
            user: userId,
            course: courseId,
            purchaseKey,
            purchaseDate: new Date(),
            expiryDate: new Date(
                new Date().setFullYear(new Date().getFullYear() + 1),
            ), // Example: 1 year validity
            paymentStatus: PaymentStatus.PENDING,
        });

        const savedPurchase = await newPurchase.save();

        // MoMo Payment Integration
        const baseUrl = process.env.BASE_URL || 'http://localhost:4000';
        const accessKey = 'F8BBA842ECF85';
        const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
        const orderInfo = 'pay with MoMo';
        const partnerCode = 'MOMO';
        const redirectUrl = `http://localhost:4000/course/callback?email=${user.email}&key=${purchaseKey}`;
        // const redirectUrl = `${baseUrl}/course/activeMail?email=${user.email}&key=${purchaseKey}`;
        const ipnUrl = 'http://localhost:4000/course/callback'; // Replace with your IPN URL
        const requestType = 'payWithMethod';
        const amount = coursePrice.toString(); // Use course price for amount
        const orderId = `${partnerCode}${new Date().getTime()}`;
        const requestId = orderId;
        const extraData = '';

        // Generate the raw signature
        const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

        // Create the signature
        const signature = crypto
            .createHmac('sha256', secretKey)
            .update(rawSignature)
            .digest('hex');

        // Create the request body
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

        // Define the request options
        const options = {
            method: 'POST',
            url: 'https://test-payment.momo.vn/v2/gateway/api/create',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(
                    JSON.stringify(requestBody),
                ),
            },
            data: JSON.stringify(requestBody),
        };

        try {
            // Make the request to MoMo
            const response = await axios(options);

            // Return the payment URL for redirection
            return {
                status: response.status,
                data: response.data,
                paymentUrl: response.data.payUrl, // Adjust this according to MoMo API response
            };
        } catch (error) {
            console.error('MoMo Payment Error:', error);
            throw new InternalServerErrorException('MoMo payment error');
        }
    }

    async createPurchaseAndPaymentUrl(
        userId: Types.ObjectId,
        courseId: Types.ObjectId,
        bankCode: string,
        ipAddr: string,
    ): Promise<string> {
        // Check if the user exists
        const userExists = await this.userModel.exists({ _id: userId });
        if (!userExists) {
            throw new InternalServerErrorException('User does not exist');
        }

        // Check if the course exists and get its price
        const course = await this.courseModel
            .findById(courseId)
            .select('price');
        if (!course) {
            throw new InternalServerErrorException('Course does not exist');
        }
        const coursePrice = course.price;
        if (!coursePrice) {
            throw new InternalServerErrorException('Course price is not set');
        }

        // Check if the user has already registered for this course
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

        // Create a purchase
        const purchaseKey = uuidv4();
        const newPurchase = new this.purchaseModel({
            user: userId,
            course: courseId,
            purchaseKey,
            purchaseDate: new Date(),
            expiryDate: new Date(
                new Date().setFullYear(new Date().getFullYear() + 1),
            ),
            paymentStatus: PaymentStatus.PENDING,
        });
        await newPurchase.save();
        const user = await this.userModel.findById(userId);
        const tmnCode = process.env.VNP_TMN_CODE;
        const secretKey = process.env.VNP_HASH_SECRET;
        const vnpUrl = process.env.VNP_URL;
        const returnUrl = `http://localhost:4000/course/callbackvnpay?email=${user.email}&key=${purchaseKey}`;

        const date = new Date();
        const padZero = (num) => num.toString().padStart(2, '0');

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
            vnp_Amount: coursePrice * 100,
            vnp_ReturnUrl: returnUrl,
            vnp_IpAddr: ipAddr,
            vnp_CreateDate: createDate,
        };

        if (bankCode) {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

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

    async sendSuccessEmail(email: string, key: string): Promise<void> {
        const mailOptions = {
            from: '<hieu@78544@gmail.com>',
            to: email,
            subject: 'Password Reset Request',
            html: `
                <p>Active key : ${key}:</p>
              `,
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Failed to send password reset email:', error);
            throw new Error('Failed to send password reset email');
        }
    }

    // async sendMail(email :string, to: string, subject: string, text: string, key:string): Promise<void> {
    //     const mailOptions = {
    //         from: '<hieu@78544@gmail.com>',
    //         to: email,
    //         subject: 'Password Reset Request',
    //         html: `
    //     <p>Active key : ${key}:</p>
    //   `,
    //     };

    //     try {
    //         await transporter.sendMail(mailOptions);
    //     } catch (error) {
    //         console.error('Failed to send password reset email:', error);
    //         throw new Error('Failed to send password reset email');
    //     }
    // }
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
}
