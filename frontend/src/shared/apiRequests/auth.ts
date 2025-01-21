import apiClient from "@/shared/config/apiClient";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
} from "@/shared/types/AuthenTypes";
import { RoleResType } from "@/shared/types/RoleTypes";

const authRequestApi = {
  login: (body: LoginBodyType) =>
    apiClient.post<LoginBodyType, LoginResType>("/auth/login", body),
  register: (body: RegisterBodyType) =>
    apiClient.post<RegisterBodyType, RegisterResType>("/auth/register", body),
  getRole: () => apiClient.get<RoleResType>("/auth/roleCheck"),
  auth: (body: { token: string; expiresAt: number }) =>
    apiClient.post("/auth/storeSession", body),
};

export default authRequestApi;
