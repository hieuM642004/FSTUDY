import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { Exams, ExamSession, Question } from './ExamSchema/exam.schema';
import { generateSlug } from 'src/utils/generateSlug';
import FirebaseService from 'src/providers/storage/firebase/firebase.service';
import { CreateQuestionDto } from './dto/questions/createQuestion.dto';
import { UpdateQuestionDto } from './dto/questions/updateQuestion.dto';
import { GoogleDriveUploader } from 'src/providers/storage/drive/drive.upload';
import { Readable } from 'stream';
import { populate } from 'dotenv';
import { PaginatedResult } from './interfaces/paginatedResult';

@Injectable()
export class ExamService {
    constructor(
        @InjectModel(Exams.name)
        private readonly examModel: mongoose.Model<Exams>,
        @InjectModel(ExamSession.name)
        private readonly examSessionModel: mongoose.Model<ExamSession>,
        @InjectModel(Question.name)
        private readonly questionModel: mongoose.Model<Question>,
        private readonly googleDriveUploader: GoogleDriveUploader,
    ) {}
    async findAllExams(): Promise<Exams[]> {
        return await this.examModel.find().populate('idSession').exec();
    }
    async findExamById(identifier: string): Promise<Exams> {
        let exam: Exams;

        if (mongoose.Types.ObjectId.isValid(identifier)) {
            exam = await this.examModel
                .findById(identifier)
                .populate('idSession');
        } else {
            exam = await this.examModel
                .findOne({ slug: identifier })
                .populate('idSession');
        }
        if (!exam) {
            throw new NotFoundException('Exam not found.');
        }
        return exam;
    }
    async searchExams(
        page: number = 1,
        limit: number = 10,
        searchQuery?: string,
        examType?: string,
    ): Promise<PaginatedResult<Exams>> {
        let query: any = {};

        if (searchQuery) {
            query.title = { $regex: searchQuery, $options: 'i' };
        }

        if (examType) {
            query.examType = examType;
        }

        const totalItems = await this.examModel.countDocuments(query).exec();
        const totalPages = Math.ceil(totalItems / limit);
        const startIndex = (page - 1) * limit;

        const exams = await this.examModel
            .find(query)
            .skip(startIndex)
            .limit(limit)
            .populate('idSession')
            .exec();

        const result: PaginatedResult<Exams> = {
            data: exams,
            totalPages: totalPages,
            currentPage: page,
            totalItems: totalItems,
        };

        return result;
    }

    async createExam(exam: Exams): Promise<Exams> {
        try {
            exam.slug = generateSlug(exam.title);
            const existingExam = await this.examModel
                .findOne({ title: exam.title })
                .exec();
            if (existingExam) {
                throw new ConflictException('Exam title already exists.');
            }
            return await this.examModel.create(exam);
        } catch (error) {
            throw error;
        }
    }
    async updateExam(id: string, exam: Exams): Promise<Exams> {
        try {
            exam.slug = generateSlug(exam.title);
            const existingExam = await this.examModel
                .findOne({ _id: id })
                .exec();
            if (!existingExam) {
                throw new NotFoundException('Exam not found.');
            }
            return await this.examModel
                .findByIdAndUpdate(id, exam, { new: true })
                .exec();
        } catch (error) {
            throw error;
        }
    }
    async deleteExam(id: string): Promise<Exams> {
        try {
            const existingExam = await this.examModel
                .findOne({ _id: id })
                .exec();
            if (!existingExam) {
                throw new NotFoundException('Exam not found.');
            }
            if (existingExam.idSession.length > 0) {
                existingExam.idSession.map(async (sessionId) => {
                    await this.examSessionModel
                        .findByIdAndDelete(sessionId)
                        .exec();
                });
            }
            return await this.examModel.findByIdAndDelete(id).exec();
        } catch (error) {
            throw error;
        }
    }

    //Exam Session
    async findAllSessions(): Promise<ExamSession[]> {
        return await this.examSessionModel.find().exec();
    }

    async findSessionById(identifier: string): Promise<ExamSession> {
        let session: ExamSession;

        if (mongoose.Types.ObjectId.isValid(identifier)) {
            session = await this.examSessionModel.findById(identifier);
            // .populate('idQuestions');
        } else {
            session = await this.examSessionModel.findOne({ slug: identifier });
            // .populate('idQuestions');
        }
        if (!session) {
            throw new NotFoundException('Exam session not found.');
        }
        return session;
    }

    async createSession(session: ExamSession): Promise<ExamSession> {
        try {
            session.slug = generateSlug(session.title);
            const existingSession = await this.examSessionModel
                .findOne({ title: session.title })
                .exec();
            if (existingSession) {
                throw new ConflictException(
                    'Exam session title already exists.',
                );
            }
            const savedSession = await this.examSessionModel.create(session);

            await this.examModel
                .updateMany(
                    { _id: { $in: session.idExam } },
                    { $push: { idSession: savedSession._id } },
                )
                .exec();

            return savedSession;
        } catch (error) {
            throw error;
        }
    }

    async updateSession(
        id: string,
        session: ExamSession,
    ): Promise<ExamSession> {
        try {
            session.slug = generateSlug(session.title);
            const existingSession = await this.examSessionModel
                .findById(id)
                .exec();
            if (!existingSession) {
                throw new NotFoundException('Exam session not found.');
            }
            return await this.examSessionModel
                .findByIdAndUpdate(id, session, { new: true })
                .exec();
        } catch (error) {
            throw error;
        }
    }

    async deleteSession(id: string): Promise<ExamSession> {
        try {
            const existingSession = await this.examSessionModel
                .findById(id)
                .exec();
            if (!existingSession) {
                throw new NotFoundException('Exam session not found.');
            }

            await this.examModel
                .updateMany({ idSession: id }, { $pull: { idSession: id } })
                .exec();

            return await this.examSessionModel.findByIdAndDelete(id).exec();
        } catch (error) {
            throw error;
        }
    }

    //Question
    async findAllQuestions(): Promise<Question[]> {
        return await this.questionModel.find().exec();
    }

    async findQuestionById(id: string): Promise<Question> {
        const question = await this.questionModel.findById(id).exec();
        if (!question) {
            throw new NotFoundException('Question not found.');
        }
        return question;
    }

    async createQuestion(
        createQuestionDto: CreateQuestionDto,
        image?: Express.Multer.File,
        audio?: Express.Multer.File,
    ): Promise<Question> {
        try {
            if (image) {
                const fileStream = Readable.from(image.buffer);
                const imageId = await this.googleDriveUploader.uploadImage(
                    fileStream,
                    image.originalname,
                    '1dBsbu_CDHGOY_9Jsq_wBwB5_gqAWNMvu',
                );
                createQuestionDto.imageUrl =
                    this.googleDriveUploader.getThumbnailUrl(imageId);
            }

            if (audio) {
                const fileStream = Readable.from(audio.buffer);
                const audioId = await this.googleDriveUploader.uploadVideo(
                    fileStream,
                    audio.originalname,
                    '1dBsbu_CDHGOY_9Jsq_wBwB5_gqAWNMvu',
                );
                createQuestionDto.audioUrl =
                    this.googleDriveUploader.getVideoUrl(audioId);
            }
            const question = await this.questionModel.create(createQuestionDto);
            await this.examSessionModel
                .updateMany(
                    { _id: { $in: createQuestionDto.examSession } },
                    { $push: { idQuestions: question._id } },
                )
                .exec();
            return question;
        } catch (error) {
            throw new Error('Error creating question: ' + error.message);
        }
    }

    async updateQuestion(
        id: string,
        updateQuestionDto: UpdateQuestionDto,
        imageFile?: Express.Multer.File,
        audioFile?: Express.Multer.File,
    ): Promise<Question> {
        try {
            const existingQuestion = await this.questionModel
                .findById(id)
                .exec();
            if (!existingQuestion) {
                throw new NotFoundException('Question not found.');
            }

            if (imageFile && existingQuestion.imageUrl) {
                const oldImageFileId =
                    this.googleDriveUploader.extractFileIdFromUrl(
                        existingQuestion.imageUrl,
                    );
                if (oldImageFileId) {
                    await this.googleDriveUploader.delete(oldImageFileId);
                }
            }

            if (imageFile) {
                const fileStream = Readable.from(imageFile.buffer);
                const newImageFileId =
                    await this.googleDriveUploader.uploadImage(
                        fileStream,
                        imageFile.originalname,
                        '1dBsbu_CDHGOY_9Jsq_wBwB5_gqAWNMvu',
                    );
                updateQuestionDto.imageUrl =
                    this.googleDriveUploader.getThumbnailUrl(newImageFileId);
            }

            if (audioFile && existingQuestion.audioUrl) {
                const oldAudioFileId =
                    this.googleDriveUploader.extractFileIdFromUrl(
                        existingQuestion.audioUrl,
                    );
                if (oldAudioFileId) {
                    await this.googleDriveUploader.delete(oldAudioFileId);
                }
            }

            if (audioFile) {
                const fileStream = Readable.from(audioFile.buffer);
                const newAudioFileId =
                    await this.googleDriveUploader.uploadVideo(
                        fileStream,
                        audioFile.originalname,
                        '1dBsbu_CDHGOY_9Jsq_wBwB5_gqAWNMvu',
                    );
                updateQuestionDto.audioUrl =
                    this.googleDriveUploader.getVideoUrl(newAudioFileId);
            }

            const updatedQuestion = await this.questionModel
                .findByIdAndUpdate(id, updateQuestionDto, { new: true })
                .exec();
            return updatedQuestion;
        } catch (error) {
            throw new Error('Error updating question: ' + error.message);
        }
    }

    async deleteQuestion(id: string): Promise<Question> {
        const existingQuestion = await this.questionModel.findById(id).exec();
        if (!existingQuestion) {
            throw new NotFoundException('Question not found.');
        }
        if (existingQuestion.audioUrl) {
            const audioFileId = this.googleDriveUploader.extractFileIdFromUrl(
                existingQuestion.audioUrl,
            );
            if (audioFileId) {
                await this.googleDriveUploader.delete(audioFileId);
            }
        }

        if (existingQuestion.imageUrl) {
            const imageFileId = this.googleDriveUploader.extractFileIdFromUrl(
                existingQuestion.imageUrl,
            );
            if (imageFileId) {
                await this.googleDriveUploader.delete(imageFileId);
            }
        }

        await this.examSessionModel
            .updateMany(
                { _id: existingQuestion.examSession },
                { $pull: { idQuestions: existingQuestion._id } },
            )
            .exec();
        return await this.questionModel.findByIdAndDelete(id).exec();
    }
}
