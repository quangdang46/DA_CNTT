import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

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
        const token = localStorage.getItem("auth_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

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
