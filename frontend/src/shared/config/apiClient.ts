import envConfig from "@/shared/config/config";
import axios from "axios";
import { getCookie } from "cookies-next";
// import { getCookie } from "cookies-next";

// Cấu hình axios
const apiClient = axios.create({
  baseURL: envConfig.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm token vào header Authorization
apiClient.interceptors.request.use(
  (config) => {
    const token = getCookie("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
