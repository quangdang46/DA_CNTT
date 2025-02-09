import apiClient from "@/shared/config/apiClient";
import { useMutation } from "@tanstack/react-query";
interface UploadResponse {
  message: string;
  url: string; // Đường dẫn của file đã upload
}

interface UploadPayload {
  file: File | FormData; // File cần upload
}

const uploadApiRequest = {
  useUploadFile: () => {
    return useMutation<UploadResponse, Error, UploadPayload>({
      mutationFn: async (payload: UploadPayload) => {
        try {
          let formData: FormData;

          if (payload.file instanceof File) {
            formData = new FormData();
            formData.append("file", payload.file); // Nếu là File, thêm vào FormData
          } else {
            formData = payload.file as FormData; // Nếu là FormData, sử dụng trực tiếp
          }
          // Gửi request POST đến backend
          const response = await apiClient.post<UploadPayload, UploadResponse>(
            "/uploads",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data", // Quan trọng khi upload file
              },
            }
          );
          console.log("Response from backend:", response);
          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      },
    });
  },
  
};

export default uploadApiRequest;
