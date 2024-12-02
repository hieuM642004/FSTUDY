import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ExamResultService } from './examResult.service';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { ExamResult } from './ExamResultSchema/examResult.schema';

@Controller('exam-result')
export class ExamResultController {
    constructor(private readonly examResultService: ExamResultService) {}
    //Static
    @Get('count-exam-result')
    async countResult() {
        return await this.examResultService.countResult();
    }

    @Get()
    async findAllExamResult() {
        try {
            const results = await this.examResultService.findAllExamResult();
            return new ResponseData<ExamResult>(
                results,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<ExamResult>(
                [],
                HttpStatus.SUCCESS,
                error.response.message,
            );
        }
    }

    @Get(':id')
    async findExamResultById(@Param('id') id: string) {
        try {
            const results = await this.examResultService.findExamResultById(id);
            return new ResponseData<ExamResult>(
                results,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<ExamResult>(
                [],
                HttpStatus.SUCCESS,
                error.response.message,
            );
        }
    }
    @Get('user/:userId')
    async findExamResultByUser(@Param('userId') userId: string) {
        try {
            const results =
                await this.examResultService.findExamResultByUserId(userId);
            return new ResponseData<ExamResult>(
                results,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<ExamResult>(
                [],
                HttpStatus.SUCCESS,
                error.response.message,
            );
        }
    }
    @Get('user/:userId/exam/:examId')
    async findExamResultByUserAndExam(
        @Param('userId') userId: string,
        @Param('examId') examId: string,
    ) {
        try {
            const results =
                await this.examResultService.findExamResultByUserIdAndExamId(
                    userId,
                    examId,
                );
            return new ResponseData<ExamResult>(
                results,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<ExamResult>(
                [],
                HttpStatus.SUCCESS,
                error.response.message,
            );
        }
    }

    @Get('group-question/:id')
    async findExamResultByIdGrouped(@Param('id') id: string) {
        try {
            const results =
                await this.examResultService.findExamResultByIdGrouped(id);
            return new ResponseData<ExamResult>(
                results,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<ExamResult>(
                [],
                HttpStatus.SUCCESS,
                error.response.message,
            );
        }
    }
    @Get('exam/:id')
    async findExamResultByExam(@Param('id') id: string) {
        try {
            const results =
                await this.examResultService.findExamResultByExamId(id);
            return new ResponseData<ExamResult>(
                results,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<ExamResult>(
                [],
                HttpStatus.SUCCESS,
                error.response.message,
            );
        }
    }

    @Post('create-exam-result')
    async createExamResult(@Body() examResult: ExamResult) {
        try {
            const results =
                await this.examResultService.createExamResult(examResult);
            return new ResponseData<ExamResult>(
                results,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<ExamResult>(
                [],
                HttpStatus.SUCCESS,
                error.response.message,
            );
        }
    }
    @Delete('delete-exam-result')
    async deleteExamResult(@Param('id') id: string) {
        try {
            const results = await this.examResultService.deleteExamResult(id);
            return new ResponseData<ExamResult>(
                results,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<ExamResult>(
                [],
                HttpStatus.SUCCESS,
                error.response.message,
            );
        }
    }
}
