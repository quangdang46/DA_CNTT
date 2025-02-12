import apiClient from "@/shared/config/apiClient";
import { DashboardType } from "@/shared/types/AdminTypes";
import { ResType } from "@/shared/types/resType";
import { useQuery } from "@tanstack/react-query";

const adminApiRequest = {
  useGetDashboard: () => {
    return useQuery<ResType<DashboardType>, Error>({
      queryKey: ["dashboard"],
      queryFn: async () => {
        try {
          const response = await apiClient.get<ResType<DashboardType>>(
            "/admin/dashboard"
          );
          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      },
      staleTime: 1000 * 60 * 5,
      placeholderData: (previousData) => previousData,
    });
  },
};

export default adminApiRequest;
