import {
    Get,
    Put,
    Post,
    Delete,
    Body,
    Controller,
    Param,
    UseInterceptors,
    UploadedFile,
    UploadedFiles,
    Query,
} from '@nestjs/common';
import { ExamService } from './exam.service';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { Exams, ExamSession, Question } from './ExamSchema/exam.schema';
import { CreateExamsDto } from './dto/exams/createExams.dto';
import { UpdateExamsDto } from './dto/exams/updateExams.dto';
import { UpdateExamSessionDto } from './dto/examSession/updateExamSession.dto';
import { CreateExamSessionDto } from './dto/examSession/createExamSession.dto';
import { CreateQuestionDto } from './dto/questions/createQuestion.dto';
import { UpdateQuestionDto } from './dto/questions/updateQuestion.dto';
import {
    FileFieldsInterceptor,
    FileInterceptor,
    FilesInterceptor,
} from '@nestjs/platform-express';
import { PaginatedResult } from './interfaces/paginatedResult';

@Controller('exams')
export class ExamController {
    constructor(readonly examService: ExamService) {}

    @Get()
    async findAllExams(): Promise<ResponseData<Exams[]>> {
        try {
            const exams = await this.examService.findAllExams();
            return new ResponseData<Exams[]>(
                exams,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<Exams[]>(
                null,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    @Get('exam/:identifier')
    async findExamById(
        @Param('identifier') identifier: string,
    ): Promise<ResponseData<Exams>> {
        try {
            const exam = await this.examService.findExamById(identifier);
            return new ResponseData<Exams>(
                exam,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<Exams>(
                null,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }
    @Get('search-exams')
    async searchExams(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('title') title?: string,
        @Query('examType') examType?: string,
    ): Promise<ResponseData<PaginatedResult<Exams>>> {
        try {
            const result = await this.examService.searchExams(
                page,
                limit,
                title,
                examType,
            );
            return new ResponseData<PaginatedResult<Exams>>(
                result,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<PaginatedResult<Exams>>(
                [],
                HttpStatus.ERROR,
                error.response.message,
            );
        }
    }

    @Post('create-exam')
    async createExam(
        @Body() exam: CreateExamsDto,
    ): Promise<ResponseData<Exams>> {
        try {
            const saveExam = await this.examService.createExam(exam);
            return new ResponseData<Exams>(
                saveExam,
                HttpStatus.CREATED,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<Exams>(
                null,
                HttpStatus.ERROR,
                error.response.message,
            );
        }
    }
    @Put('update-exam/:id')
    async updateExam(
        @Param('id') id: string,
        @Body() exam: UpdateExamsDto,
    ): Promise<ResponseData<Exams>> {
        try {
            const updateExam = await this.examService.updateExam(id, exam);
            return new ResponseData<Exams>(
                updateExam,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<Exams>(
                null,
                HttpStatus.ERROR,
                error.response.message,
            );
        }
    }
    @Delete('delete-exam/:id')
    async deleteExam(@Param('id') id: string): Promise<ResponseData<Exams>> {
        try {
            const deleteExam = await this.examService.deleteExam(id);
            return new ResponseData<Exams>(
                deleteExam,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<Exams>(
                null,
                HttpStatus.ERROR,
                error.response.message,
            );
        }
    }

    //Exam session
    @Get('sessions')
    async findAllSessions(): Promise<ResponseData<ExamSession[]>> {
        try {
            const sessions = await this.examService.findAllSessions();
            return new ResponseData<ExamSession[]>(
                sessions,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<ExamSession[]>(
                [],
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    @Get('sessions/:identifier')
    async findSessionById(
        @Param('identifier') identifier: string,
    ): Promise<ResponseData<ExamSession>> {
        try {
            const session = await this.examService.findSessionById(identifier);
            return new ResponseData<ExamSession>(
                session,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<ExamSession>(
                null,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    @Post('create-session')
    async createSession(
        @Body() session: CreateExamSessionDto,
    ): Promise<ResponseData<ExamSession>> {
        try {
            const savedSession = await this.examService.createSession(session);
            return new ResponseData<ExamSession>(
                savedSession,
                HttpStatus.CREATED,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<ExamSession>(
                null,
                HttpStatus.ERROR,
                error.response.message,
            );
        }
    }

    @Put('update-session/:id')
    async updateSession(
        @Param('id') id: string,
        @Body() session: UpdateExamSessionDto,
    ): Promise<ResponseData<ExamSession>> {
        try {
            const updatedSession = await this.examService.updateSession(
                id,
                session,
            );
            return new ResponseData<ExamSession>(
                updatedSession,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<ExamSession>(
                null,
                HttpStatus.ERROR,
                error.response.message,
            );
        }
    }

    @Delete('delete-session/:id')
    async deleteSession(
        @Param('id') id: string,
    ): Promise<ResponseData<ExamSession>> {
        try {
            const deletedSession = await this.examService.deleteSession(id);
            return new ResponseData<ExamSession>(
                deletedSession,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<ExamSession>(
                null,
                HttpStatus.ERROR,
                error.response.message,
            );
        }
    }

    //Question
    @Get('questions')
    async findAllQuestions(): Promise<ResponseData<Question[]>> {
        try {
            const questions = await this.examService.findAllQuestions();
            return new ResponseData<Question[]>(
                questions,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<Question[]>(
                null,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    @Get('questions/:id')
    async findQuestionById(
        @Param('id') id: string,
    ): Promise<ResponseData<Question>> {
        try {
            const question = await this.examService.findQuestionById(id);
            return new ResponseData<Question>(
                question,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<Question>(
                null,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    @Post('create-question')
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'image', maxCount: 1 },
            { name: 'audio', maxCount: 1 },
        ]),
    )
    async createQuestion(
        @Body() createQuestionDto: CreateQuestionDto,
        @UploadedFiles()
        files: { image?: Express.Multer.File[]; audio?: Express.Multer.File[] },
    ): Promise<ResponseData<Question>> {
        try {
            const imageFile = files?.image ? files.image[0] : null;
            const audioFile = files?.audio ? files.audio[0] : null;
            const savedQuestion = await this.examService.createQuestion(
                createQuestionDto,
                imageFile,
                audioFile,
            );
            return new ResponseData<Question>(
                savedQuestion,
                HttpStatus.CREATED,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<Question>(
                null,
                HttpStatus.ERROR,
                error.message,
            );
        }
    }

    @Put('update-question/:id')
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'image', maxCount: 1 },
            { name: 'audio', maxCount: 1 },
        ]),
    )
    async updateQuestion(
        @Param('id') id: string,
        @Body() updateQuestionDto: UpdateQuestionDto,
        @UploadedFiles()
        files: { image?: Express.Multer.File[]; audio?: Express.Multer.File[] },
    ): Promise<ResponseData<Question>> {
        try {
            const imageFile = files?.image ? files.image[0] : null;
            const audioFile = files?.audio ? files.audio[0] : null;
            const updatedQuestion = await this.examService.updateQuestion(
                id,
                updateQuestionDto,
                imageFile,
                audioFile,
            );
            return new ResponseData<Question>(
                updatedQuestion,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<Question>(
                null,
                HttpStatus.ERROR,
                error.message,
            );
        }
    }

    @Delete('delete-question/:id')
    async deleteQuestion(
        @Param('id') id: string,
    ): Promise<ResponseData<Question>> {
        try {
            const deletedQuestion = await this.examService.deleteQuestion(id);
            return new ResponseData<Question>(
                deletedQuestion,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<Question>(
                null,
                HttpStatus.ERROR,
                error.response.message,
            );
        }
    }
}
