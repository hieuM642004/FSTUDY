import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import {
    Exams,
    ExamSession,
    Question,
    QuestionGroup,
} from './ExamSchema/exam.schema';
import { generateSlug } from 'src/utils/generateSlug';
import { CreateQuestionDto } from './dto/questions/createQuestion.dto';
import { UpdateQuestionDto } from './dto/questions/updateQuestion.dto';
import { GoogleDriveUploader } from 'src/providers/storage/drive/drive.upload';
import { Readable } from 'stream';
import { PaginatedResult } from './interfaces/paginatedResult';
import { UpdateQuestionGroupDto } from './dto/questionGroup/updateQuestionGroup.dto';
import { CreateQuestionGroupDto } from './dto/questionGroup/createQuestionGroup.dto';
import FirebaseService from 'src/providers/storage/firebase/firebase.service';

@Injectable()
export class ExamService {
    constructor(
        @InjectModel(Exams.name)
        private readonly examModel: mongoose.Model<Exams>,
        @InjectModel(ExamSession.name)
        private readonly examSessionModel: mongoose.Model<ExamSession>,
        @InjectModel(QuestionGroup.name)
        private readonly questionGroupModel: mongoose.Model<QuestionGroup>,
        @InjectModel(Question.name)
        private readonly questionModel: mongoose.Model<Question>,
        private readonly googleDriveUploader: GoogleDriveUploader,
        private readonly firebaseService: FirebaseService,
    ) {}
    async countAllExams(): Promise<number> {
        return await this.examModel.countDocuments().exec();
    }
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
        exam.view+=1
        await this.examModel.findByIdAndUpdate(exam._id, { view: exam.view }).exec();
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
        return await this.examSessionModel.find().populate('idExam').exec();
    }

    async findSessionById(identifier: string): Promise<ExamSession> {
        let session: ExamSession;

        if (mongoose.Types.ObjectId.isValid(identifier)) {
            session = await this.examSessionModel.findById(identifier).populate('idExam');
            // .populate('idQuestions');
        } else {
            session = await this.examSessionModel.findOne({ slug: identifier }).populate('idExam');
            // .populate('idQuestions');
        }
        if (!session) {
            throw new NotFoundException('Exam session not found.');
        }
        return session;
    }

    async getQuestionsBySessionIds(slug: string[]): Promise<ExamSession[]> {
        const sessions = await this.examSessionModel
            .find({ slug: { $in: slug } })
            .populate({
                path: 'idQuestionGroups',
                populate: {
                    path: 'questions',
                },
            })
            .exec();

        const allQuestions = sessions.reduce((acc, session) => {
            return acc.concat(session.idQuestionGroups);
        }, []);

        return allQuestions;
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

    //Group Question
    async findAllQuestionGroups(): Promise<QuestionGroup[]> {
        return await this.questionGroupModel.find().populate('examSession').exec();
    }
    async findQuestionGroupById(id: string): Promise<QuestionGroup> {
        const questionGroup = await this.questionGroupModel.findById(id).exec();
        if (!questionGroup) {
            throw new NotFoundException('QuestionGroup not found.');
        }
        return questionGroup;
    }
    async createQuestionGroup(
        createQuestionGroupDto: CreateQuestionGroupDto,
        image?: Express.Multer.File,
        audio?: Express.Multer.File,
    ): Promise<QuestionGroup> {
        try {
            if (image) {
                const imageUrl = await this.firebaseService.uploadImageToFirebase(
                    image.buffer,
                    image.originalname,
                    'images'
                );
                createQuestionGroupDto.imageUrl = imageUrl;
            }
    
            if (audio) {
                const audioUrl = await this.firebaseService.uploadAudioToFirebase(
                    audio.buffer,
                    audio.originalname,
                    'audio'
                );
                createQuestionGroupDto.audioUrl = audioUrl;
            }
    
            const questionGroup = await this.questionGroupModel.create(
                createQuestionGroupDto,
            );
            await this.examSessionModel
                .updateMany(
                    { _id: { $in: createQuestionGroupDto.examSession } },
                    { $push: { idQuestionGroups: questionGroup._id } },
                )
                .exec();
            return questionGroup;
        } catch (error) {
            throw new Error('Error creating questionGroup: ' + error.message);
        }
    }
    

    async updateQuestionGroup(
        id: string,
        updateQuestionGroupDto: UpdateQuestionGroupDto,
        imageFile?: Express.Multer.File,
        audioFile?: Express.Multer.File,
    ): Promise<QuestionGroup> {
        try {
            const existingQuestionGroup = await this.questionGroupModel
                .findById(id)
                .exec();
            if (!existingQuestionGroup) {
                throw new NotFoundException('QuestionGroup not found.');
            }
    
            if (imageFile) {
             
                const imageUrl = await this.firebaseService.uploadImageToFirebase(
                    imageFile.buffer,
                    imageFile.originalname,
                    'images'
                );
                updateQuestionGroupDto.imageUrl = imageUrl;
            }
    
            if (audioFile) {
              
                const audioUrl = await this.firebaseService.uploadAudioToFirebase(
                    audioFile.buffer,
                    audioFile.originalname,
                    'audio'
                );
                updateQuestionGroupDto.audioUrl = audioUrl;
            }
    
            const updatedQuestionGroup = await this.questionGroupModel
                .findByIdAndUpdate(id, updateQuestionGroupDto, { new: true })
                .exec();
            return updatedQuestionGroup;
        } catch (error) {
            throw new Error('Error updating questionGroup: ' + error.message);
        }
    }
    

    async deleteQuestionGroup(id: string): Promise<QuestionGroup> {
        const existingQuestionGroup = await this.questionGroupModel
            .findById(id)
            .exec();
        if (!existingQuestionGroup) {
            throw new NotFoundException('QuestionGroup not found.');
        }
    
        // if (existingQuestionGroup.audioUrl) {
        //     await this.firebaseService.deleteFileFromFirebase(existingQuestionGroup.audioUrl);
        // }
    
        // if (existingQuestionGroup.imageUrl) {
        //     await this.firebaseService.deleteFileFromFirebase(existingQuestionGroup.imageUrl);
        // }
    
        await this.examSessionModel
            .updateMany(
                { _id: existingQuestionGroup.examSession },
                { $pull: { idQuestionGroups: existingQuestionGroup._id } },
            )
            .exec();
            await Promise.all(existingQuestionGroup.questions.map(async (questionId) => {
                await this.deleteQuestion(questionId.toString());
            }));
        return await this.questionGroupModel.findByIdAndDelete(id).exec();
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
    ): Promise<Question> {
        try {
            console.log('Question',createQuestionDto);
            const questionGroup = await this.questionGroupModel
                .findById(createQuestionDto.questionGroup)
                .populate({
                    path: 'examSession',
                    populate: {
                        path: 'idExam',
                        model: 'Exams',
                    },
                })
                .exec();

            if (!questionGroup) {
                throw new NotFoundException('QuestionGroup not found.');
            }

            const examSession =
                questionGroup.examSession as unknown as ExamSession;
            const examId = examSession?.idExam; 

            if (!examId) {
                throw new NotFoundException(
                    'Exam ID not found in ExamSession.',
                );
            }

            // Fetch all ExamSessions for the given Exam
            const examSessions = await this.examSessionModel
                .find({ idExam: examId })
                .exec();
            const examSessionIds = examSessions.map((es) => es._id);

            // Fetch all QuestionGroups for these ExamSessions
            const questionGroups = await this.questionGroupModel
                .find({ examSession: { $in: examSessionIds } })
                .exec();
            const questionGroupIds = questionGroups.map((qg) => qg._id);

            // Find the maximum order value for all questions in these QuestionGroups
            const maxOrderQuestion = await this.questionModel
                .find({ questionGroup: { $in: questionGroupIds } })
                .sort({ order: -1 })
                .limit(1)
                .exec();

            const nextOrder =
                maxOrderQuestion.length > 0 ? maxOrderQuestion[0].order + 1 : 1;

            // Assign the new order to the question
            createQuestionDto.order = nextOrder;

            // Create the new question
            const question = await this.questionModel.create(createQuestionDto);
            
            // Update the QuestionGroup with the new question
            await this.questionGroupModel
                .updateOne(
                    { _id: createQuestionDto.questionGroup },
                    { $push: { questions: question._id } },
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
    ): Promise<Question> {
        try {
            const existingQuestion = await this.questionModel
                .findById(id)
                .exec();
            if (!existingQuestion) {
                throw new NotFoundException('Question not found.');
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

     
        return await this.questionModel.findByIdAndDelete(id).exec();
    }
}
