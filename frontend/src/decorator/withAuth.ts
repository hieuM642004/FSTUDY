import {jwtDecode} from 'jwt-decode';
import AuthService from '@/services/auth/AuthService'; 
import { getCookie, setCookie } from 'cookies-next';
import { nestApiInstance } from '@/constant/api';

interface DecodedToken {
    exp: number;
}

function withTokenRefresh(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
        let token = getCookie('token') as string;

        if (token) {
            const decodedToken: DecodedToken = jwtDecode(token);
            const currentTime = new Date().getTime();
            const tokenExpirationTime = decodedToken.exp * 1000;

            if (tokenExpirationTime - currentTime < 10000) {
                const refreshedTokens = await AuthService.handleRefreshToken();
                if (!refreshedTokens) {
                    throw new Error('Unable to refresh token');
                }
                
                token = refreshedTokens.accessToken;
            }

            nestApiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        return originalMethod.apply(this, args);
    };

    return descriptor;
}

export default withTokenRefresh;
