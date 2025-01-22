import authRequestApi from "@/shared/apiRequests/auth";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { setCookie } from "cookies-next/client";

class ApiClient {
  private instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
      headers: {
        "Content-Type": "application/json",
      },
    });
    // this.instance.interceptors.response.use(
    //   (response) => response,
    //   (error) => Promise.reject(error) // Xu ly loi
    // );
    // Interceptor cho response
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true; // Đánh dấu yêu cầu này đã được thử lại
          const newToken = await this.refreshAccessToken();
          if (newToken) {
            // Lưu token mới vào localStorage
            localStorage.setItem("auth_token", newToken);
            setCookie("auth_token", newToken, { maxAge: 60 * 60 });
            // Cập nhật lại headers của yêu cầu
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            // Thực hiện lại yêu cầu ban đầu
            return this.instance(originalRequest);
          }
        }
        return Promise.reject(error); // Trả về lỗi nếu không thể refresh token
      }
    );
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("auth_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }
  private refreshAccessToken = async () => {
    try {
      const response = await authRequestApi.refresh();
      if (response.success) {
        return response.data.token;
      }
    } catch (error) {
      console.log("Error refreshing access token:", error);
    }
  };

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.get<T>(url, config);
    return response.data;
  }

  // Phương thức POST
  async post<T, U>(
    url: string,
    data: T,
    config?: AxiosRequestConfig
  ): Promise<U> {
    const response: AxiosResponse<U> = await this.instance.post<U>(
      url,
      data,
      config
    );
    return response.data;
  }

  // Phương thức PUT
  async put<T, U>(
    url: string,
    data: T,
    config?: AxiosRequestConfig
  ): Promise<U> {
    const response: AxiosResponse<U> = await this.instance.put<U>(
      url,
      data,
      config
    );
    return response.data;
  }

  // Phương thức DELETE
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.delete<T>(
      url,
      config
    );
    return response.data;
  }

  // Phương thức PATCH
  async patch<T, U>(
    url: string,
    data: T,
    config?: AxiosRequestConfig
  ): Promise<U> {
    const response: AxiosResponse<U> = await this.instance.patch<U>(
      url,
      data,
      config
    );
    return response.data;
  }
}
const apiClient = new ApiClient();

export default apiClient;
