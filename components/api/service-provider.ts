// services/ServiceProvider.ts
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import AppConfig from "../lib/app-config";
import CookieProvider from "../lib/cookie";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../types/const";

class ServiceProvider {
  public static apiClient: AxiosInstance | null = null;

  public static initializeClient(): AxiosInstance {
    if (this.apiClient) return this.apiClient;
    const baseURL = AppConfig?.env?.ServiceBaseUrl || "";
    const client = axios.create({ baseURL, timeout: 30_000 });
    client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const accessToken = CookieProvider.getCookie(ACCESS_TOKEN);
        if (accessToken) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          CookieProvider.deleteCookie(ACCESS_TOKEN);
          CookieProvider.deleteCookie(REFRESH_TOKEN);
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );

    this.apiClient = client;
    return client;
  }
}

export default ServiceProvider;
