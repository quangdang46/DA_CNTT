import apiClient from "@/shared/config/apiClient";
import {
  Address,
  DistrictListResType,
  ProvinceListResType,
  ShippingFee,
  ShippingFeeRes,
  WardListResType,
} from "@/shared/types/LocationTypes";
import { ResType } from "@/shared/types/resType";
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

  useGetAddress: () => {
    return useQuery<ResType<Address[]>, Error>({
      queryKey: ["address"],
      queryFn: async () => {
        try {
          const response = await apiClient.get<ResType<Address[]>>(
            `/locations/getAddresses`
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
  useShippingFee: (addr: Address) => {
    return useQuery<ShippingFeeRes, Error>({
      queryKey: ["shipping-fee", addr],
      queryFn: async () => {
        try {
          const response = await apiClient.post<ShippingFee, ShippingFeeRes>(
            `/locations/shipping-fee`,
            {
              province: addr.province.name,
              district: addr.district.name,
              ward: addr.ward.name,
              address: addr.address,
            }
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
      enabled: !!addr,
      staleTime: 1000 * 60 * 5,
    });
  },
};

export default locationApiRequest;
