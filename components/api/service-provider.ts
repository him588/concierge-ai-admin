// services/ServiceProvider.ts
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import AppConfig from "@/components/lib/app-config";
import CookieProvider from "@/components/lib/cookie";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/components/types/const";
import { JWTProvider } from "@/components/lib/jwt-provider";
import { refreshToken } from "@/components/api/api";

let isRefreshing = false;

class ServiceProvider {
  public static apiClient: AxiosInstance | null = null;

  public static initializeClient(): AxiosInstance {
    console.log("access token", JWTProvider.MetaData);
    if (this.apiClient) return this.apiClient;
    console.log("initialize client");
    const baseURL = `${AppConfig?.env?.ServiceBaseUrl}` || "";
    const client = axios.create({ baseURL, timeout: 30_000 });
    client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const accessToken = JWTProvider.AccessToken;
        console.log("access token", accessToken);

        // 🧠 If token expires in < 5 min → refresh
        if (JWTProvider.isAccessTokenExpiringSoon(5)) {
          if (!isRefreshing) {
            isRefreshing = true;
            refreshToken().finally(() => {
              isRefreshing = false;
            });
          }
        }
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
