import axios from 'axios';

import { config } from 'dotenv';
config();

const URL = process.env.SENSIBO_URL;

const instance = axios.create({
    baseURL: URL,
    params: {
        apiKey: process.env.SENSIBO_API_KEY,
      }
});

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors here, e.g., show a user-friendly error message
        console.error('Error:', error);
        return Promise.reject(error);
    }
);

export default instance;