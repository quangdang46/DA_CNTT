import apiClient from "@/shared/config/apiClient";
import { CategoryResType } from "@/shared/types/CategoryTypes";
import { useQuery } from "@tanstack/react-query";

export const categoryApiRequest = {
  useGetCategories: () => {
    return useQuery({
      queryKey: ["categories"],
      queryFn: async () => {
        try {
          const response = await apiClient.get<CategoryResType>("/categories");
          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      },
    });
  },
};
