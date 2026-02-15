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
import { Loader } from "@/components/common/loader";

const BaseContext = createContext<undefined | BaseContextType>(undefined);

export const BaseProvider = ({
  children,
  appConfig,
}: {
  children: React.ReactNode;
  appConfig: DynamicConfig;
}) => {
  const [userDetails, setUserDetails] = useState<UserDetails | undefined>(
    undefined,
  );
  const [isauthReady, setIsAuthReady] = useState(false);
  const [alert, setAlert] = useState("");
  AppConfig.set(appConfig);
  useEffect(() => {
    const refreshToken = CookieProvider.getCookie(REFRESH_TOKEN);

    const refresh = async () => {
      if (!refreshToken) {
        // No login session → no auth bootstrap needed
        setIsAuthReady(true);
        return;
      }

      console.log("refresh token value", refreshToken);

      try {
        const response = await refreshAccessToken(refreshToken);
        const accessToken = response.data.accessToken;
        JWTProvider.setAccessToken(accessToken);
        ServiceProvider.initializeClient();
        userDetails();
        setIsAuthReady(true);
      } catch (err) {
        console.error("Failed to refresh:", err);
      }
    };
    async function userDetails() {
      try {
        const response = await fetchUserDetails();
        setUserDetails({ ...response?.data.user });
        console.log("userDetails", response?.data);
      } catch (error) {
        console.log("Error while fetching user details", error);
      }
    }

    refresh();
  }, []);

  useEffect(() => {
    if (alert === "") return;
    setTimeout(() => {
      setAlert("");
    }, 3000);
  }, [alert]);

  const contextValue = useMemo<BaseContextType>(
    () => ({
      userDetails,
      setUserDetails,
      alert,
      setAlert,
    }),
    [userDetails, alert],
  );

  return (
    <BaseContext.Provider value={contextValue}>
      {isauthReady ? (
        <>
          <div
            role="alert"
            className={`alert bg-[#fff3f4] px-[100px]  absolute  z-[999] left-[50%] -translate-x-1/2 outline-none border-none alert-error translate-all duration-250 alert-soft ${
              alert ? "top-3" : "-top-[100px]"
            }`}
          >
            <span>{alert}</span>
          </div>

          {children}
        </>
      ) : (
        <Loader />
      )}
    </BaseContext.Provider>
  );
};

export function useBaseContext() {
  const context = useContext(BaseContext);
  if (context === undefined) {
    throw new Error("useBaseContext must be used within a BaseContextProvider");
  }
  return context;
}
