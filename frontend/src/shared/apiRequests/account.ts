import apiClient from "@/shared/config/apiClient";
import { AccountResType, UpdateMeBodyType } from "@/shared/types/UserTypes";

const accountApiRequest = {
  me: () => apiClient.get<AccountResType>("/account/me"),
  updateMe: (body: UpdateMeBodyType) =>
    apiClient.put<UpdateMeBodyType, AccountResType>("/account/updateMe", body),
};

export default accountApiRequest;
