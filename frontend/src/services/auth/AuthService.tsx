import { nestApiInstance } from '@/constant/api';
import { RegisterAndLogin } from '@/types/auth/Auth';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
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
            toast.error(error.response.data.message);
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
            toast.error(error.response.data.message);
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
        } catch (error) {
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
            toast.error(error.response.data.message);
            console.error('Error fetching login:', error);
        }
    }
    static isTokenExpired = async (token: string) => {
        try {
            const decodedToken: any = jwtDecode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                await this.handleRefreshToken();
            }
        } catch (error) {
            console.error('Error fetching login:', error);
        }
    };
    static async handleRefreshToken(
        originalConfig?: any,
    ): Promise<undefined | any[]> {
        try {
            const RefreshToken = getCookie('refreshToken');
            const response = await nestApiInstance.post(`/auth/refresh-token`, {
                refresh_token: RefreshToken,
            });
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;
            setCookie('token', accessToken);
            setCookie('refreshToken', refreshToken);
            return nestApiInstance(originalConfig);
        } catch (error) {
            console.error('Error fetching login:', error);
        }
    }
    static handleTokenExpired() {
        try {
            deleteCookie('token');
            deleteCookie('refreshToken');
            Router.push('/login');
        } catch (error) {
            toast.error(error.response.data.message);
            console.error('Error fetching login:', error);
        }
    }
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
