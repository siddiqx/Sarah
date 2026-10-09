import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
    username: string;
    full_name: string | null;
    current_day: number;
    current_phase: number;
  };
}

interface UserResponse {
  id: number;
  email: string;
  username: string;
  full_name: string | null;
  current_day: number;
  current_phase: number;
}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 30000,
    });

    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("access_token");
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("access_token");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  get<T>(url: string, config?: object) {
    return this.client.get<T>(url, config);
  }

  post<T>(url: string, data?: object, config?: object) {
    return this.client.post<T>(url, data, config);
  }

  put<T>(url: string, data?: object, config?: object) {
    return this.client.put<T>(url, data, config);
  }

  patch<T>(url: string, data?: object, config?: object) {
    return this.client.patch<T>(url, data, config);
  }

  delete<T>(url: string, config?: object) {
    return this.client.delete<T>(url, config);
  }
}

export const api = new ApiClient();
export type { LoginResponse, UserResponse };
