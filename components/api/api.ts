import ServiceProvider from "@/components/api/service-provider";
import { JWTProvider } from "@/components/lib/jwt-provider";
import { CreateRoom, CreateRoomTypePayload } from "../types/types";
import axios from "axios";
import AppConfig from "../lib/app-config";
import CookieProvider from "../lib/cookie";
import { REFRESH_TOKEN } from "../types/const";

export async function refreshToken() {
  const refresh = CookieProvider.getCookie(REFRESH_TOKEN);
  const res = await axios.post(
    `${AppConfig.env.ServiceBaseUrl}/auth/refresh-accesstoken`,
    {
      refreshToken: refresh,
    }
  );
  const { accessToken } = res.data;
  JWTProvider.setAccessToken(accessToken);
}

export async function createRoomType(roomType: CreateRoomTypePayload) {
  return ServiceProvider.apiClient?.post(
    "/room/create-type",
    { ...roomType },
    {
      headers: { ...JWTProvider.MetaData },
    }
  );
}

export async function getRoomTypes() {
  return ServiceProvider.apiClient?.get(`/room/get-type`, {
    headers: { ...JWTProvider.MetaData },
  });
}

export async function createRoom(formData: FormData) {
  return ServiceProvider.apiClient?.post("/room/create-room", formData, {
    headers: {
      ...JWTProvider.MetaData,
      "Content-Type": "multipart/form-data",
    },
  });
}
