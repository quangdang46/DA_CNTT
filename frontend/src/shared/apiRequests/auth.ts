import apiClient from "@/shared/config/apiClient";
import {
  LoginBodyType,
  LoginResType,
  RefreshTokenResType,
  RegisterBodyType,
  RegisterResType,
} from "@/shared/types/AuthenTypes";

const authRequestApi = {
  login: (body: LoginBodyType) =>
    apiClient.post<LoginBodyType, LoginResType>("/auth/login", body),
  register: (body: RegisterBodyType) =>
    apiClient.post<RegisterBodyType, RegisterResType>("/auth/register", body),
  refresh: () => apiClient.get<RefreshTokenResType>("/auth/refreshToken"),
  logout: (signal?: AbortSignal) => apiClient.post("/auth/logout", { signal }),
};

export default authRequestApi;
