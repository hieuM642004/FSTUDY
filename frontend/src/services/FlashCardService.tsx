import { nestApiInstance, pythonApiInstance } from '@/constant/api';
import withTokenRefresh from '@/decorator/withAuth';
import FlashCard from '@/types/FlashCard';
class FlashCardService {
    @withTokenRefresh
    static async getAllFlashCards() {
        try {
            const response = await nestApiInstance.get('/flashcards');
            return response.data.data;
        } catch (error) {
            console.error('Error fetching flashcards:', error);
        }
    }
    
    static async getAllFlashCardById(id: string) {
        try {
            const response = await nestApiInstance.get(`/flashcards/flashcard/${id}`);
            return response.data.data[0];
        } catch (error) {
            console.error('Error fetching flashcards:', error);
        }
    }

    static async addFlashCard(newCard: FlashCard): Promise<FlashCard | null> {
        try {
            const response = await nestApiInstance.post('/flashcards/create-flashcard', newCard);
            return response.data.data;
        } catch (error) {
            console.error('Error adding flashcard:', error);
            return null;
        }
    }

    static async updateFlashCard(
        id:string,
        updatedCard: FlashCard,
    ): Promise<FlashCard | null> {
        try {
            const response = await nestApiInstance.put(
                `/flashcards/update-flashcard/${id}`,
                updatedCard,
            );
            return response.data;
        } catch (error) {
            console.error('Error updating flashcard:', error);
            return null;
        }
    }

    static async deleteFlashCard(id: string): Promise<boolean> {
        try {
            await nestApiInstance.delete(`/flashcards/delete-flashcard/${id}`);
            return true;
        } catch (error) {
            console.error('Error deleting flashcard:', error);
            return false;
        }
    }
    static async getExampleFlashCards(input: string) {
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
                data
            );
            return response;
        } catch (error) {
            console.error('Error in getMeasuringProficiency:', error);
            throw error;
        }
    }
    static async searchVideo(word:string) {
        try {
            const response = await pythonApiInstance.get(
                `/search_video?word=${word}`, 
               
            );
            return response;
        } catch (error) {
            console.error('Error in getMeasuringProficiency:', error);
            throw error;
        }
    }

static async startConversation(topic: string) {
    try {
        const formData = new FormData();
        formData.append('topic', topic);

      
        const response = await pythonApiInstance.post(`/start-conversation`, formData);
        return response;
    } catch (error) {
        console.error('Error in startConversation:', error);
        throw error;
    }
}

    
    static async speaking(data:any) {
        try {
            const response = await pythonApiInstance.post(
                `/conversation`, 
               data
            );
            return response;
        } catch (error) {
            console.error('Error in getMeasuringProficiency:', error);
            throw error;
        }
    }
    static async getTopicInConversation() {
        try {
            const response = await pythonApiInstance.get(`/get-topics`);
            return response.data; 
        } catch (error) {
            console.error('Error in getTopicInConversation:', error);
            throw error;
        }
    }
    
    
}

export default FlashCardService;
