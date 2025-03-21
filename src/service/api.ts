import axios, {AxiosInstance} from 'axios';

// Base API configuration
const API_BASE_URL = 'https://v2.jokeapi.dev';
const TIMEOUT = 10000;

// Create axios instance with default configurations
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default apiClient;
