"use client";
import ServiceProvider from "@/components/api/service-provider";
import AppConfig from "@/components/lib/app-config";
import CookieProvider from "@/components/lib/cookie";
import { JWTProvider } from "@/components/lib/jwt-provider";
import { REFRESH_TOKEN } from "@/components/types/const";
import { DynamicConfig } from "@/components/types/types";
import { refreshAccessToken } from "@/features/auth/api";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchUserDetails } from "./api";
import { BaseContextType, UserDetails } from "./types/types";

const BaseContext = createContext<undefined | BaseContextType>(undefined);

export const BaseProvider = ({
  children,
  appConfig,
}: {
  children: React.ReactNode;
  appConfig: DynamicConfig;
}) => {
  const [userDetails, setUserDetails] = useState<UserDetails | undefined>(
    undefined
  );
  AppConfig.set(appConfig);
  useEffect(() => {
    const refreshToken = CookieProvider.getCookie(REFRESH_TOKEN);

    const refresh = async () => {
      console.log("refresh token value", refreshToken);
      if (!refreshToken) return;
      try {
        const response = await refreshAccessToken(refreshToken);
        const accessToken = response.data.accessToken;
        JWTProvider.setAccessToken(accessToken);
        ServiceProvider.initializeClient();
        userDetails();
      } catch (err) {
        console.error("Failed to refresh:", err);
      }
    };
    async function userDetails() {
      try {
        const response = await fetchUserDetails();
        console.log("userDetails", response?.data);
      } catch (error) {
        console.log("Error while fetching user details", error);
      }
    }

    refresh();
  }, []);

  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);

  const contextValue = useMemo<BaseContextType>(
    () => ({
      userDetails,
      setUserDetails,
    }),
    [userDetails]
  );

  return (
    <BaseContext.Provider value={contextValue}>{children}</BaseContext.Provider>
  );
};

export function useBaseContext() {
  const context = useContext(BaseContext);
  if (context === undefined) {
    throw new Error("useBaseContext must be used within a BaseContextProvider");
  }
  return context;
}
