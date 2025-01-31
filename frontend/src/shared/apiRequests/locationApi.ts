import apiClient from "@/shared/config/apiClient";
import { Province, District, Ward } from "@/shared/types/LocationTypes";
import { ResType } from "@/shared/types/resType";
import { useQuery } from "@tanstack/react-query";

const locationApiRequest = {
  useProvinces: () => {
    return useQuery<ResType<Province[]>, Error>({
      queryKey: ["provinces"],
      queryFn: async () => {
        try {
          const response = await apiClient.get<ResType<Province[]>>(
            "/locations/provinces"
          );

          if (!response.success) {
            return response;
          }

          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      },
    });
  },

  useDistricts: (provinceId: string) => {
    return useQuery<ResType<District[]>, Error>({
      queryKey: ["districts", provinceId],
      queryFn: async () => {
        if (!provinceId) {
          throw new Error("Province ID is required");
        }

        try {
          const response = await apiClient.get<ResType<District[]>>(
            `/locations/districts`,
            { params: { provinceId } }
          );

          if (!response.success) {
            return response;
          }

          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      },
    });
  },

  useWards: (districtId: string) => {
    return useQuery<ResType<Ward[]>, Error>({
      queryKey: ["wards", districtId],
      queryFn: async () => {
        if (!districtId) {
          throw new Error("District ID is required");
        }

        try {
          const response = await apiClient.get<ResType<Ward[]>>(
            `/locations/wards`,
            { params: { districtId } }
          );

          if (!response.success) {
            return response;
          }

          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      },
    });
  },
};

export default locationApiRequest;
