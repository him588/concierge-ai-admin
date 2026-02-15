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
    if (this.apiClient) return this.apiClient;

    const baseURL = AppConfig?.env?.ServiceBaseUrl || "";
    const client = axios.create({ baseURL, timeout: 30_000 });

    // ================= REQUEST =================
    client.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        // 🔐 Access expired + refresh valid → silent refresh
        if (JWTProvider.isAccessTokenExpiringSoon(10) && !isRefreshing) {
          try {
            isRefreshing = true;
            await refreshToken();
          } catch {
            CookieProvider.deleteCookie(ACCESS_TOKEN);
            CookieProvider.deleteCookie(REFRESH_TOKEN);
            if (typeof window !== "undefined") {
              window.location.href = "/login";
            }
          } finally {
            isRefreshing = false;
          }
        }

        const newAccessToken = JWTProvider.AccessToken;
        if (newAccessToken) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return config;
      },
      (error: AxiosError) => Promise.reject(error),
    );

    // ================= RESPONSE =================
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
        }

        return Promise.reject(error);
      },
    );

    this.apiClient = client;
    return client;
  }
}

export default ServiceProvider;
