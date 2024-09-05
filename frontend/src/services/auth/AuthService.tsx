import { nestApiInstance } from '@/constant/api';
import withAuth from '@/decorator/withAuth';
import { RegisterAndLogin } from '@/types/auth/Auth';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';

import Router from 'next/router';

class AuthService {
    static async register(
        newData: RegisterAndLogin,
    ): Promise<RegisterAndLogin | undefined> {
        try {
            const response = await nestApiInstance.post(
                '/auth/register',
                newData,
            );
            return response.data.data;
        } catch (error) {
          
            console.error('Error fetching register:', error);
        }
    }
    static async login(
        dataEmailandPass: RegisterAndLogin,
    ): Promise<RegisterAndLogin | undefined> {
        try {
            const response = await nestApiInstance.post(
                '/auth/login',
                dataEmailandPass,
            );
            return response.data;
        } catch (error) {
          
            console.error('Error fetching login:', error);
        }
    }
    static async logout(refreshToken: string): Promise<string | undefined> {
        try {
            const response = await nestApiInstance.post('/auth/logout', {
                refresh_token: refreshToken,
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching login:', error);
        }
    }
    static async forgotPassword(
        dataEmail: string,
    ): Promise<string | undefined | number> {
        try {
            const response = await nestApiInstance.post(
                '/auth/forgot-password',
                dataEmail,
            );
            return response.data;
        } catch (error ) {
            console.error('Error fetching login:', error);
            return error.response.status;
        }
    }
    static async resetPassword(
        newPassword: string,
        token: string | null,
    ): Promise<string | undefined | number> {
        try {
            const response = await nestApiInstance.post(
                `/auth/reset-password?token=${token}`,
                newPassword,
            );
            return response.data;
        } catch (error) {
          
            console.error('Error fetching login:', error);
        }
    }
    static isTokenExpired = (token: string): boolean => {
        try {
            const decodedToken: any = jwtDecode(token);
            return decodedToken.exp * 1000 < new Date().getTime();
        } catch (error) {
            console.error('Error checking token expiration:', error);
            return true; // Có thể mặc định là expired nếu gặp lỗi trong việc decode token.
        }
    };
    
    static async handleRefreshToken(): Promise<any | null> {
        try {
            const RefreshToken = getCookie('refreshToken');
            const response = await nestApiInstance.post(`/auth/refresh-token`, {
                refresh_token: RefreshToken,
            });
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;
            setCookie('token', accessToken);
            setCookie('refreshToken', refreshToken);
    
          
            return { accessToken, refreshToken }; 
        } catch (error) {
            console.error('Error refreshing token:', error);
            return null;
        }
    }
    
    
    // static handleTokenExpired(): void {
    //     try {
    //         deleteCookie('token');
    //         deleteCookie('refreshToken');
    //         Router.push('/login');
    //     } catch (error) {
    //         console.error('Error handling token expiration:', error);
    //     }
    // }
    
    static async getByIdUser(id: string): Promise<string | any> {
        try {
            const response = await nestApiInstance.get(`users/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching login:', error);
        }
    }
}

export default AuthService;
