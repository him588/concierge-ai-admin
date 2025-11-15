import AppConfig from "@/components/lib/app-config";
import axios from "axios";

// ServiceProvider.apiClient?.post("")

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  return axios.post(`${AppConfig.env.ServiceBaseUrl}/auth/signup`, {
    name,
    email,
    password,
  });
};

export const verifyUser = async (
  userId: string,
  otp: string,
  email: string
) => {
  return axios.post(`${AppConfig.env.ServiceBaseUrl}/auth/verify`, {
    userId,
    otp,
    email,
  });
};

export const userLogin = async (email: string, password: string) => {
  return axios.post(`${AppConfig.env.ServiceBaseUrl}/auth/login`, {
    email,
    password,
  });
};

export const resendOtp = async (email: string) => {
  return axios.post(`${AppConfig.env.ServiceBaseUrl}/auth/resend-otp`, {
    email,
  });
};

export const refreshAccessToken = async (refreshToken: string) => {
  return axios.post(
    `${AppConfig.env.ServiceBaseUrl}/auth/refresh-accesstoken`,
    {
      refreshToken,
    }
  );
};

export const googleAuthentication = async (code: string) => {
  return axios.post(`${AppConfig.env.ServiceBaseUrl}/auth/google-auth`, {
    code,
  });
};
