import { nestApiInstance } from '@/constant/api';
import withTokenRefresh from '@/decorator/withAuth';

class PurchaseService {
    @withTokenRefresh
    static async purchaseMomo({
        userId,
        courseId,
    }: String | any): Promise<string | undefined> {
        try {

            const response = await nestApiInstance.post(
                `/course/purchase/${courseId}`,
                { userId: userId },
            );

            if (response.status === 201) {
                return response.data.data;
            }
        } catch (error : any) {
            console.error('Error fetching register:', error);
            return error.response
        }
    }
    @withTokenRefresh
    static async purchaseVnpay({
        userId,
        courseId,
    }: String | any): Promise<string | undefined> {
        try {
            const response = await nestApiInstance.post(
                `/course/purchase-vnpay/${courseId}`,
                { userId: userId, bankCode: 'NCB' },
            );
            if (response.status === 201) {
                return response.data;
            }
        } catch (error : any) {
            console.error('Error fetching register:', error);
            return error.response
        }
    }
    @withTokenRefresh
    static async activeCourse({
        key,
    }: String | any): Promise<string | undefined> {
        try {
            const response = await nestApiInstance.post(`/course/complete`, {
                key: key,
            });

            if (response.status === 201) {
                return response.data;
            }
        } catch (error) {
            console.error('Error fetching register:', error);
        }
    }
}

export default PurchaseService;
