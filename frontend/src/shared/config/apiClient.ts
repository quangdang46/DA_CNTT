import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class ApiClient {
  private instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error) // Xu ly loi
    );
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("auth_token");
        const guestId = localStorage.getItem("guest_id");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        } else if (guestId) {
          // Nếu không có token nhưng có guest_id, thêm vào header
          config.headers["X-Guest-ID"] = guestId;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    // Interceptor response
    this.instance.interceptors.response.use(
      (response) => {
        const guestIdFromCookie = response.headers["x-guest-id"];

        if (guestIdFromCookie) {
          localStorage.setItem("guest_id", guestIdFromCookie); // Lưu guest_id vào localStorage
        }

        return response;
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
