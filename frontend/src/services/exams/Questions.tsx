import { nestApiInstance, pythonApiInstance } from '@/constant/api';
import { Exams } from '@/types/Exams';
class QuestionsService {
    static async getAllQuestions() {
        try {
            const response = await nestApiInstance.get(
                `/exams/questions`,
            );

            return response.data.data;
        } catch (error) {
            console.error('Error fetching exams:', error);
        }
    }
    static async getAllQuestionsById(id: string) {
        try {
            const response = await nestApiInstance.get(`/exams/questions/${id}`);
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

    static async addQuestions(newCard: any): Promise<any | null> {
        try {
            const response = await nestApiInstance.post(
                '/exams/create-question',
                newCard,
            );
            return response.data.data;
        } catch (error) {
            console.error('Error adding exam:', error);
            return null;
        }
    }

    static async updateQuestions(
        id: string,
        updatedCard: Exams,
    ): Promise<Exams | null> {
        try {
            const response = await nestApiInstance.put(
                `/exams/update-question/${id}`,
                updatedCard,
            );
            return response.data;
        } catch (error) {
            console.error('Error updating exam:', error);
            return null;
        }
    }

    static async deleteQuestions(id: string): Promise<boolean> {
        try {
            await nestApiInstance.delete(`/exams/delete-question/${id}`);
            return true;
        } catch (error) {
            console.error('Error deleting exam:', error);
            return false;
        }
    }
   
}

export default QuestionsService;
