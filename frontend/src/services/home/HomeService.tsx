import { nestApiInstance } from '@/constant/api';
import withTokenRefresh from '@/decorator/withAuth';

class HomeService {
    
    static async getPurchasesByUserId({
        userId,
    }: String | any): Promise<string | undefined> {
        try {
            const response = await nestApiInstance.get(
                `/course/purchase/${userId}`,
            );

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.error('Error fetching register:', error);
        }
    }
    static async getAllCourse(): Promise<string | undefined> {
        try {
            const response = await nestApiInstance.get(
                `/course`,
            );

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.error('Error fetching register:', error);
        }
    }
}

export default HomeService;
