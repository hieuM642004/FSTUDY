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

export const pythonApiInstance = axios.create({
    baseURL: PYTHON_API_BASE_URL,
});

export { nestApiInstance, SOCKET_SERVER_URL };
