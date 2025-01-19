import apiClient from "@/shared/config/apiClient";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
} from "@/shared/types/AuthenTypes";

const authRequestApi = {
  login: (body: LoginBodyType) =>
    apiClient.post<LoginBodyType, LoginResType>("/auth/login", body),
  register: (body: RegisterBodyType) =>
    apiClient.post<RegisterBodyType, RegisterResType>("/auth/register", body),
  auth: (body: { token: string; expiresAt: string }) =>
    apiClient.post("/api/auth", body),
};

export default authRequestApi;
