import apiClient from "@/shared/config/apiClient";
import {
  DistrictListResType,
  ProvinceListResType,
  WardListResType,
} from "@/shared/types/LocationTypes";
import { useQuery } from "@tanstack/react-query";

const locationApiRequest = {
  useProvinces: () => {
    return useQuery<ProvinceListResType, Error>({
      queryKey: ["provinces"],
      queryFn: async () => {
        try {
          const response = await apiClient.get<ProvinceListResType>(
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
    return useQuery<DistrictListResType, Error>({
      queryKey: ["districts", provinceId],
      queryFn: async () => {
        if (!provinceId) {
          throw new Error("Province ID is required");
        }

        try {
          const response = await apiClient.get<DistrictListResType>(
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
    return useQuery<WardListResType, Error>({
      queryKey: ["wards", districtId],
      queryFn: async () => {
        if (!districtId) {
          throw new Error("District ID is required");
        }

        try {
          const response = await apiClient.get<WardListResType>(
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
