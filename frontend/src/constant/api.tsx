import AuthService from '@/services/auth/AuthService';
import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';

const NEST_API_BASE_URL = 'http://localhost:4000';
const PYTHON_API_BASE_URL = 'http://127.0.0.1:5000';

const nestApiInstance = axios.create({
    baseURL: NEST_API_BASE_URL,
});

nestApiInstance.interceptors.request.use(
    async (config) => {
        let token = getCookie('token');
        if (token) {
            // try {
            //     AuthService.isTokenExpired(token);
            // } catch (error) {            
            //     AuthService.handleTokenExpired();
            //     throw error;
            // }
            config.headers.Authorization = token ? `Bearer ${token}` : '';
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);
nestApiInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
        console.log('originalConfig', originalConfig);
        console.log('err', err);
        if(err.response.status===403){
            try {
              await  AuthService.handleRefreshToken(originalConfig);
            } catch (error) {            
                AuthService.handleTokenExpired();
                throw error;
            }
        }
      return Promise.reject(err);
    }
  );
export const pythonApiInstance = axios.create({
    baseURL: PYTHON_API_BASE_URL,
});

export { nestApiInstance };
