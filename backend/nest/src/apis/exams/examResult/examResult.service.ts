import { Injectable, NotFoundException } from '@nestjs/common';
import { ExamResult } from './ExamResultSchema/examResult.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ExamSession } from '../ExamSchema/exam.schema';

@Injectable()
export class ExamResultService {
    constructor(
        @InjectModel(ExamResult.name)
        private readonly examResultModel: mongoose.Model<ExamResult>,
        @InjectModel(ExamSession.name)
        private readonly examSessionModel: mongoose.Model<ExamSession>,
    ) {}
    //Static
    async countResult(): Promise<number> {
        return await this.examResultModel.countDocuments().exec();
    }

    async findAllExamResult(): Promise<ExamResult[]> {
        return await this.examResultModel
            .find()
            .populate({
                path: 'examSessionId',
                populate: {
                    path: 'idExam',
                    model: 'Exams',
                    select: 'examType title',
                },
            })
            .populate({
                path: 'correctAnswers.questionId',
                select: 'questionText options',
            })
            .populate({
                path: 'incorrectAnswers.questionId',
                select: 'questionText options',
            })
            .populate({
                path: 'skippedAnswers.questionId',
                select: 'questionText options',
            })
            .populate({ path: 'idUser', select: 'fullname' })
            .exec();
    }

    async findExamResultByIdGrouped(id: string): Promise<any> {
        try {
            const result = await this.examResultModel
                .findById(id)
                .populate({
                    path: 'examSessionId',
                    populate: {
                        path: 'idExam',
                        model: 'Exams',
                        select: 'examType title',
                    },
                })
                .populate({
                    path: 'correctAnswers.questionId',
                    select: 'questionText explanation order questionType correctAnswer options questionGroup',
                    populate: {
                        path: 'questionGroup',
                        model: 'QuestionGroup',
                        select: '_id examSession passageText imageUrl audioUrl',
                    },
                })
                .populate({
                    path: 'incorrectAnswers.questionId',
                    select: 'questionText explanation order questionType correctAnswer options questionGroup',
                    populate: {
                        path: 'questionGroup',
                        model: 'QuestionGroup',
                        select: '_id examSession passageText imageUrl audioUrl',
                    },
                })
                .populate({
                    path: 'skippedAnswers.questionId',
                    select: 'questionText explanation order questionType correctAnswer options questionGroup',
                    populate: {
                        path: 'questionGroup',
                        model: 'QuestionGroup',
                        select: '_id examSession passageText imageUrl audioUrl',
                    },
                })
                .populate({ path: 'idUser', select: 'fullname' })
                .exec();

            if (!result) {
                throw new NotFoundException(
                    `ExamResult with id ${id} not found`,
                );
            }

            const examSessions = Array.isArray(result.examSessionId)
                ? result.examSessionId
                : [];

            const groupedQuestions = examSessions.map((session) => {
                return {
                    sessionId: session._id,
                    sessionTitle: session.title,
                    sessionDescription: session.description,
                    correctAnswers: result.correctAnswers.filter(
                        (answer: any) =>
                            answer.questionId &&
                            answer.questionId.questionGroup &&
                            answer.questionId.questionGroup.examSession &&
                            answer.questionId.questionGroup.examSession.toString() ===
                                session._id.toString(),
                    ),
                    incorrectAnswers: result.incorrectAnswers.filter(
                        (answer: any) =>
                            answer.questionId &&
                            answer.questionId.questionGroup &&
                            answer.questionId.questionGroup.examSession &&
                            answer.questionId.questionGroup.examSession.toString() ===
                                session._id.toString(),
                    ),
                    skippedAnswers: result.skippedAnswers.filter(
                        (answer: any) =>
                            answer.questionId &&
                            answer.questionId.questionGroup &&
                            answer.questionId.questionGroup.examSession &&
                            answer.questionId.questionGroup.examSession.toString() ===
                                session._id.toString(),
                    ),
                };
            });

            return {
                _id: result._id,
                idUser: result.idUser,
                examSessions: groupedQuestions,
                accuracy: result.accuracy,
                completionTime: result.completionTime,
            };
        } catch (error) {
            console.log(error);
            throw new Error('An error occurred while fetching the exam result');
        }
    }
    async findExamResultByUserIdAndExamId(
        userId: string,
        examId: string,
    ): Promise<ExamResult[]> {
        const examSessions = await this.examSessionModel
            .find({ idExam: examId })
            .exec();

        return await this.examResultModel
            .find({
                idUser: userId,
                examSessionId: {
                    $in: examSessions.map((session) => session._id),
                },
            })
            .populate({
                path: 'examSessionId',
                populate: {
                    path: 'idExam',
                    model: 'Exams',
                    select: 'examType title _id',
                },
            })
            .populate({
                path: 'correctAnswers.questionId',
                select: 'questionText options',
            })
            .populate({
                path: 'incorrectAnswers.questionId',
                select: 'questionText options',
            })
            .populate({
                path: 'skippedAnswers.questionId',
                select: 'questionText options',
            })
            .populate({ path: 'idUser', select: 'fullname' })
            .exec();
    }
    async findExamResultByUserId(userId: string): Promise<ExamResult[]> {
        return await this.examResultModel
            .find({ idUser: userId })
            .populate({
                path: 'examSessionId',
                populate: {
                    path: 'idExam',
                    model: 'Exams',
                    select: 'examType title',
                },
            })
            .populate({
                path: 'correctAnswers.questionId',
                select: 'questionText options',
            })
            .populate({
                path: 'incorrectAnswers.questionId',
                select: 'questionText options',
            })
            .populate({
                path: 'skippedAnswers.questionId',
                select: 'questionText options',
            })
            .populate({ path: 'idUser', select: 'fullname' })
            .exec();
    }

    async findExamResultById(id: String): Promise<ExamResult> {
        return await this.examResultModel
            .findById(id)
            .populate({
                path: 'examSessionId',
                populate: {
                    path: 'idExam',
                    model: 'Exams',
                    select: 'examType title',
                },
            })
            .populate({
                path: 'correctAnswers.questionId',
                select: 'questionText options explanation order questionType correctAnswer options',
            })
            .populate({
                path: 'incorrectAnswers.questionId',
                select: 'questionText options explanation order questionType correctAnswer options',
            })
            .populate({
                path: 'skippedAnswers.questionId',
                select: 'questionText options explanation order questionType correctAnswer options',
            })
            .populate({ path: 'idUser', select: 'fullname' })
            .exec();
    }

    async findExamResultByExamId(idExam: string): Promise<ExamResult[]> {
        const examSessions = await this.examSessionModel
            .find({ idExam })
            .populate({
                path: 'idExam',
                select: 'examType title',
            })
            .populate({
                path: 'idQuestionGroups',
                select: 'title description',
            })
            .exec();

        return await this.examResultModel
            .find({
                examSessionId: {
                    $in: examSessions.map((session) => session._id),
                },
            })
            .populate({
                path: 'examSessionId',
                populate: {
                    path: 'idExam',
                    model: 'Exams',
                    select: 'examType title',
                },
            })
            .populate({
                path: 'correctAnswers.questionId',
                select: 'questionText options',
            })
            .populate({
                path: 'incorrectAnswers.questionId',
                select: 'questionText options',
            })
            .populate({
                path: 'skippedAnswers.questionId',
                select: 'questionText options',
            })
            .populate({ path: 'idUser', select: 'fullname' })
            .exec();
    }

    async createExamResult(examResult: ExamResult): Promise<ExamResult> {
        try {
            const totalAnsweredQuestions =
                examResult.correctAnswers.length +
                examResult.incorrectAnswers.length;
            const accuracy =
                totalAnsweredQuestions > 0
                    ? (examResult.correctAnswers.length /
                          totalAnsweredQuestions) *
                      100
                    : 0;
            examResult.accuracy = parseFloat(accuracy.toFixed(2));
            return await this.examResultModel.create(examResult);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteExamResult(id: string): Promise<ExamResult> {
        try {
            const existingResult = await this.examResultModel
                .findOne({ _id: id })
                .exec();
            if (!existingResult) {
                throw new NotFoundException('Exam result not found');
            }
            return await this.examResultModel.findByIdAndDelete(id).exec();
        } catch (error) {
            console.log(error);
        }
    }
}
