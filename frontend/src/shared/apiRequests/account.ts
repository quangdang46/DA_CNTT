import apiClient from "@/shared/config/apiClient";
import { AccountResType, UpdateMeBodyType } from "@/shared/types/UserTypes";

const accountApiRequest = {
  me: () => apiClient.get<AccountResType>("/account/me"),
  updateMe: (body: UpdateMeBodyType) =>
    apiClient.put<UpdateMeBodyType, AccountResType>("/account/me", body),
};

export default accountApiRequest;
