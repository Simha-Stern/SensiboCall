import axios from "axios";

import { config } from "dotenv";
config();

const URL = process.env.SENSIBO_URL;

const instance = axios.create({
  baseURL: URL,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error:", error);
    return Promise.reject(error);
  }
);

export default instance;
