import { nestApiInstance, pythonApiInstance } from '@/constant/api';
import { Exams } from '@/types/Exams';
class ExamSessionService {
    static async getAllExamsSession() {
        try {
            const response = await nestApiInstance.get(
                `/exams/sessions`,
            );

            return response.data;
        } catch (error) {
            console.error('Error fetching exams:', error);
        }
    }
    static async getAllExamsSessionById(id: string) {
        try {
            const response = await nestApiInstance.get(`/exams/sessions/${id}`);
            return response.data;
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

    static async addExamSession(newCard: any): Promise<any | null> {
        try {
            const response = await nestApiInstance.post(
                '/exams/create-session',
                newCard,
            );
            return response.data.data;
        } catch (error) {
            console.error('Error adding exam:', error);
            return null;
        }
    }

    static async updateExamsSession(
        id: string,
        updatedCard: Exams,
    ): Promise<Exams | null> {
        try {
            const response = await nestApiInstance.put(
                `/exams/update-session/${id}`,
                updatedCard,
            );
            return response.data;
        } catch (error) {
            console.error('Error updating exam:', error);
            return null;
        }
    }

    static async deleteExamsSession(id: string): Promise<boolean> {
        try {
            await nestApiInstance.delete(`/exams/delete-session/${id}`);
            return true;
        } catch (error) {
            console.error('Error deleting exam:', error);
            return false;
        }
    }
   
}

export default ExamSessionService;
