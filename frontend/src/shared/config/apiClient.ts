import envConfig from "@/shared/config/config";
import axios from "axios";

// Cấu hình axios
const apiClient = axios.create({
  baseURL: envConfig.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
