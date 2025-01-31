import apiClient from "@/shared/config/apiClient";
import { LoginResType } from "@/shared/types/AuthenTypes";
import { ResType } from "@/shared/types/resType";
import {
  AccountResType,
  UpdateMeBodyType,
  UserResType,
} from "@/shared/types/UserTypes";
import { useQuery } from "@tanstack/react-query";

const accountApiRequest = {
  me: () => apiClient.get<AccountResType>("/account/me"),
  updateMe: (body: UpdateMeBodyType) =>
    apiClient.put<UpdateMeBodyType, LoginResType>("/account/updateMe", body),

  useGetAddresses: (id: string) => {
    return useQuery<ResType<UserResType>, Error>({
      queryKey: ["addresses", id],
      queryFn: async () => {
        try {
          const response = await apiClient.get<ResType<UserResType>>(
            `/account/${id}/addresses`
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

export default accountApiRequest;
