import axios from "axios";
import { getNewAccessToken } from "@/lib/auth";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8386/api" : "/api";

const api = axios.create({baseURL: BASE_URL,});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await getNewAccessToken();
      if (newToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default api;


