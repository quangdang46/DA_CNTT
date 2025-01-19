// import envConfig from "@/shared/config/config";
// import axios from "axios";
// import { getCookie } from "cookies-next";
// // import { getCookie } from "cookies-next";

// // Cấu hình axios
// const apiClient = axios.create({
//   baseURL: envConfig.NEXT_PUBLIC_API_ENDPOINT,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
// apiClient.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => Promise.reject(error) // Xử lý lỗi
// );
// // Thêm token vào header Authorization
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = getCookie("auth_token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default apiClient;

import { ResType } from "@/shared/types/resType";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getCookie } from "cookies-next";

class ApiClient {
  private instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error) // Xu ly loi
    );
    this.instance.interceptors.request.use(
      (config) => {
        const token = getCookie("auth_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ResType<T>> {
    const response: AxiosResponse<ResType<T>> = await this.instance.get<
      ResType<T>
    >(url, config);
    return response.data;
  }

  // Phương thức POST
  async post<T, U>(
    url: string,
    data: T,
    config?: AxiosRequestConfig
  ): Promise<ResType<U>> {
    const response: AxiosResponse<ResType<U>> = await this.instance.post<
      ResType<U>
    >(url, data, config);
    return response.data;
  }

  // Phương thức PUT
  async put<T, U>(
    url: string,
    data: T,
    config?: AxiosRequestConfig
  ): Promise<ResType<U>> {
    const response: AxiosResponse<ResType<U>> = await this.instance.put<
      ResType<U>
    >(url, data, config);
    return response.data;
  }

  // Phương thức DELETE
  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ResType<T>> {
    const response: AxiosResponse<ResType<T>> = await this.instance.delete<
      ResType<T>
    >(url, config);
    return response.data;
  }

  // Phương thức PATCH
  async patch<T, U>(
    url: string,
    data: T,
    config?: AxiosRequestConfig
  ): Promise<ResType<U>> {
    const response: AxiosResponse<ResType<U>> = await this.instance.patch<
      ResType<U>
    >(url, data, config);
    return response.data;
  }
}
const apiClient = new ApiClient();

export default apiClient;
