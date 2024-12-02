
import {jwtDecode} from 'jwt-decode';
import { getCookie } from 'cookies-next';

export const getUserIdFromToken = (): string | null => {
    try {
        const token = getCookie('token');
        if (!token) {
            throw new Error('No token found');
        }

        const decoded: any = jwtDecode(token as string);
        return decoded.id || null;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};
