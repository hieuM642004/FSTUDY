import { nestApiInstance, pythonApiInstance } from '@/constant/api';
import { Exams } from '@/types/Exams';
class GroupQuestionsService {
    static async getAllGroupQuestions() {
        try {
            const response = await nestApiInstance.get(
                `/exams/group-questions`,
            );

            return response.data.data;
        } catch (error) {
            console.error('Error fetching exams:', error);
        }
    }
    static async getAllGroupQuestionsById(id: string) {
        try {
            const response = await nestApiInstance.get(`/exams/question-groups/${id}`);
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

    static async addGroupQuestions(newCard: any): Promise<any | null> {
        try {
            const response = await nestApiInstance.post(
                '/exams/create-question-groups',
                newCard,
            );
            return response.data.data;
        } catch (error) {
            console.error('Error adding exam:', error);
            return null;
        }
    }

    static async updateGroupQuestions(
        id: string,
        updatedCard: Exams,
    ): Promise<Exams | null> {
        try {
            const response = await nestApiInstance.put(
                `/exams/update-question-groups/${id}`,
                updatedCard,
            );
            return response.data;
        } catch (error) {
            console.error('Error updating exam:', error);
            return null;
        }
    }

    static async deleteGroupQuestions(id: string): Promise<boolean> {
        try {
            await nestApiInstance.delete(`/exams/question-groups/${id}`);
            return true;
        } catch (error) {
            console.error('Error deleting exam:', error);
            return false;
        }
    }
   
}

export default GroupQuestionsService;
