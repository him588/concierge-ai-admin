import ServiceProvider from "@/components/api/service-provider";
import { JWTProvider } from "@/components/lib/jwt-provider";

export const fetchUserDetails = async () => {
  return ServiceProvider.apiClient?.get("/auth/userDetails", {
    headers: {
      ...JWTProvider.MetaData,
    },
  });
};
