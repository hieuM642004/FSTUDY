import { nestApiInstance, pythonApiInstance } from '@/constant/api';
import { Exams } from '@/types/Exams';
class ExamService {
    static async getAllExams(examType?: string) {
        try {
            const response = await nestApiInstance.get(
                `/exams/search-exams?${examType}`,
            );

            return response.data.data;
        } catch (error) {
            console.error('Error fetching exams:', error);
        }
    }
    static async getAllExamById(slug: string) {
        try {
            const response = await nestApiInstance.get(`/exams/exam/${slug}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching exams:', error);
        }
    }

    static async getQuestionsBySessionIds(slugs: string[]) {
        try {
            const response = await nestApiInstance.get(
                `/exams/questions-by-sessions`,
                {
                    params: { slug: slugs },
                },
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching exams:', error);
        }
    }

    static async addExam(newCard: Exams): Promise<Exams | null> {
        try {
            const response = await nestApiInstance.post(
                '/exams/create-exam',
                newCard,
            );
            return response.data.data;
        } catch (error) {
            console.error('Error adding exam:', error);
            return null;
        }
    }

    static async updateExam(
        id: string,
        updatedCard: Exams,
    ): Promise<Exams | null> {
        try {
            const response = await nestApiInstance.put(
                `/exams/update-exam/${id}`,
                updatedCard,
            );
            return response.data;
        } catch (error) {
            console.error('Error updating exam:', error);
            return null;
        }
    }

    static async deleteExam(id: string): Promise<boolean> {
        try {
            await nestApiInstance.delete(`/exams/delete-exam/${id}`);
            return true;
        } catch (error) {
            console.error('Error deleting exam:', error);
            return false;
        }
    }
    static async getExampleExams(input: string) {
        try {
            const response = await pythonApiInstance.post(
                `/generate_response`,
                { input },
            );
            return response.data;
        } catch (error) {
            return error;
        }
    }
    static async getMeasuringProficiency(data: FormData) {
        try {
            const response = await pythonApiInstance.post(
                '/evaluate_proficiency',
                data,
            );
            return response;
        } catch (error) {
            console.error('Error in getMeasuringProficiency:', error);
            throw error;
        }
    }
    static async submitExam(answers: any) {
        try {
            const result = await nestApiInstance.post(
                'exam-result/create-exam-result',
                answers,
            );
            return result.data.data;
        } catch (error) {
            throw error;
        }
    }
    static async getResultExamById(id: any) {
        try {
            const result = await nestApiInstance.get(`exam-result/exam/${id}`);
            return result.data.data;
        } catch (error) {
            throw error;
        }
    }

    static async getResultById(id: any) {
        try {
            const result = await nestApiInstance.get(`exam-result/${id}`);
            return result.data.data;
        } catch (error) {
            throw error;
        }
    }
    static async getResultByGroupQuestions(id: any) {
        try {
            const result = await nestApiInstance.get(`exam-result/group-question/${id}`);
            return result.data.data;
        } catch (error) {
            throw error;
        }
    }
}

export default ExamService;
