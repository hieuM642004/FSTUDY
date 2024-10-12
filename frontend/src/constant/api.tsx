import AuthService from '@/services/auth/AuthService';
import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';

const NEST_API_BASE_URL = 'http://localhost:4000';
const PYTHON_API_BASE_URL = 'http://127.0.0.1:5000';
const SOCKET_SERVER_URL = 'http://localhost:3002';

const nestApiInstance = axios.create({
    baseURL: NEST_API_BASE_URL,
});

// nestApiInstance.interceptors.request.use(
//     async (config) => {
//         let token = getCookie('token');
//         if (token) {
//             const isExpired = AuthService.isTokenExpired(token);
//             if (!isExpired) {
//                 const decodedToken: any = jwtDecode(token);
//                 const expirationTime = decodedToken.exp;
//                 const currentTime = Math.floor(Date.now() / 1000);
//                 const remainingTime = expirationTime - currentTime;

//                 if (remainingTime < 10) { // Nếu thời hạn còn dưới 10 phút (600 giây)
//                     const tokens = await AuthService.handleRefreshToken();
//                     if (tokens && tokens.accessToken) {
//                         console.log('Token refresh ');
                        
//                         config.headers.Authorization = `Bearer ${tokens.accessToken}`;
//                     } else {
//                         // AuthService.handleTokenExpired();
//                         throw new Error('Token refresh failed');
//                     }
//                 } else {
//                     config.headers.Authorization = `Bearer ${token}`;
//                 }
//             } else {
//                 // AuthService.handleTokenExpired();
//                 throw new Error('Token expired');
//             }
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     },
// );

// nestApiInstance.interceptors.response.use(
//     (res) => {
//         return res;
//     },
//     async (err) => {
//         const originalConfig = err.config;
//         if (err.response && err.response.status === 401 && !originalConfig._retry) {
//             originalConfig._retry = true; // Tránh lặp vô hạn
//             try {
//                 const tokens = await AuthService.handleRefreshToken(originalConfig);
//                 if (tokens && tokens.accessToken) {
//                     originalConfig.headers.Authorization = `Bearer ${tokens.accessToken}`;
//                     return nestApiInstance(originalConfig); // Gửi lại request với token mới
//                 } else {
//                     AuthService.handleTokenExpired();
//                     return Promise.reject(new Error('Token refresh failed'));
//                 }
//             } catch (error) {
//                 AuthService.handleTokenExpired();
//                 return Promise.reject(error);    
//             }
//         }
//         return Promise.reject(err);
//     }
// );

export const pythonApiInstance = axios.create({
    baseURL: PYTHON_API_BASE_URL,
});

export { nestApiInstance , SOCKET_SERVER_URL };
