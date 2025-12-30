"use client";
import ServiceProvider from "@/components/api/service-provider";
import AppConfig from "@/components/lib/app-config";
import CookieProvider from "@/components/lib/cookie";
import { JWTProvider } from "@/components/lib/jwt-provider";
import { REFRESH_TOKEN } from "@/components/types/const";
import { DynamicConfig } from "@/components/types/types";
import { refreshAccessToken } from "@/features/auth/api";
import { createContext, useEffect } from "react";

const BaseContext = createContext(undefined);

export const BaseProvider = ({
  children,
  appConfig,
}: {
  children: React.ReactNode;
  appConfig: DynamicConfig;
}) => {
  AppConfig.set(appConfig);
  useEffect(() => {
    const refresh = async () => {
      const refreshToken = CookieProvider.getCookie(REFRESH_TOKEN);
      console.log("refresh token value", refreshToken);
      if (!refreshToken) return;
      try {
        const response = await refreshAccessToken(refreshToken);
        const accessToken = response.data.accessToken;
        JWTProvider.setAccessToken(accessToken);
        ServiceProvider.initializeClient();
      } catch (err) {
        console.error("Failed to refresh:", err);
      }
    };
    refresh();
    const interval = setInterval(refresh, 14 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BaseContext.Provider value={undefined}>{children}</BaseContext.Provider>
  );
};
