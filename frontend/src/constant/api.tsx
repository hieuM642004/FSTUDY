import axios from "axios";

const NEST_API_BASE_URL = 'http://localhost:4000';
const PYTHON_API_BASE_URL = 'http://127.0.0.1:5000';


export const nestApiInstance = axios.create({
  baseURL: NEST_API_BASE_URL,
});


export const pythonApiInstance = axios.create({
  baseURL: PYTHON_API_BASE_URL,
});
