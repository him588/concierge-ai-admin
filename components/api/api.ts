import ServiceProvider from "@/components/api/service-provider";
import { JWTProvider } from "@/components/lib/jwt-provider";
import { CreateRoomTypePayload } from "../types/types";

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
