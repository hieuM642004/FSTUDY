import { Readable } from 'stream';
import { GoogleDriveUploader } from 'src/providers/storage/drive/drive.upload';
// import { CourseLessonService } from './course-lesson.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

import { User } from '../users/userSchema/user.schema';
import { ContentType } from 'src/utils/constants';
import { generateSlug } from 'src/utils/generateSlug';

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
        const createdContent = new this.contentModel(createContentDto);
        return createdContent.save();
    }

    async findAllContent(): Promise<Content[]> {
        return this.contentModel.find().exec();
    }

    async findOneContent(id: string): Promise<Content> {
        const content = await this.contentModel.findById(id).exec();
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
        console.log(lesson);
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
            const deletedContent = await this.contentModel
                .findByIdAndDelete(id)
                .exec();
            if (!deletedContent) {
                return new ResponseData<Content>(
                    [],
                    HttpStatus.ERROR,
                    'Content not found',
                );
            }
            const res = await this.contentModel.findByIdAndDelete(id);
            return new ResponseData<Content>(
                [],
                HttpStatus.SUCCESS,
                'Delete Content successfully',
            );
        } catch (error) {
            console.error('Error deleting video:', error);
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
        return this.lessonModel.find().exec();
    }

    async findOneLesson(id: string): Promise<Lesson> {
        const lesson = await this.lessonModel.findById(id).exec();
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
            const deletedLesson = await this.lessonModel
                .findByIdAndDelete(id)
                .exec();
            if (!deletedLesson) {
                return new ResponseData<Lesson>(
                    [],
                    HttpStatus.ERROR,
                    'Lesson not found',
                );
            }
            const res = await this.lessonModel.findByIdAndDelete(id);
            return new ResponseData<Lesson>(
                [],
                HttpStatus.SUCCESS,
                'Delete Lesson successfully',
            );
        } catch (error) {
            console.error('Error deleting video:', error);
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
        return this.courseModel.find().exec();
    }

    async findOneCourse(id: string): Promise<Course> {
        const course = await this.courseModel.findById(id).exec();
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

    async createPurchase(userId: Types.ObjectId, courseId: Types.ObjectId): Promise<Purchase> {

        const userExists = await this.userModel.exists({ _id: new Types.ObjectId(userId) });
        if (!userExists) {
            throw new InternalServerErrorException('User does not exist');
        }

        const courseExists = await this.courseModel.exists({ _id: new Types.ObjectId(courseId) });
        if (!courseExists) {
            throw new InternalServerErrorException('Course does not exist');
        }
        const existingPurchase = await this.purchaseModel.findOne({
            user: new Types.ObjectId(userId),
            course: new Types.ObjectId(courseId),
            paymentStatus: PaymentStatus.COMPLETED,
        });

        if (existingPurchase) {
            throw new InternalServerErrorException(
                `User has already registered for this course`,
              );
        }
        const purchaseKey = uuidv4();

        const newPurchase = new this.purchaseModel({
            user: new Types.ObjectId(userId),
            course: new Types.ObjectId(courseId),
            purchaseKey,
            purchaseDate: new Date(),
            expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Ví dụ: 1 năm hiệu lực
            paymentStatus: PaymentStatus.PENDING,
        });

        return await newPurchase.save();
    }

    async completePayment(purchaseKey: string): Promise<Purchase> {

        // Access payment success callback
        const purchase = await this.purchaseModel.findOneAndUpdate(
            { purchaseKey },
            { paymentStatus: PaymentStatus.COMPLETED },
            { new: true }
        );

        if (purchase) {
            await this.userModel.findByIdAndUpdate(purchase.user, {
                $push: { activatedCourses: purchase.course },
            });
        }

        return purchase;
    }
} 

