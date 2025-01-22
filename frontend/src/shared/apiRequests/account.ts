import apiClient from "@/shared/config/apiClient";
import { LoginResType } from "@/shared/types/AuthenTypes";
import { AccountResType, UpdateMeBodyType } from "@/shared/types/UserTypes";

const accountApiRequest = {
  me: () => apiClient.get<AccountResType>("/account/me"),
  updateMe: (body: UpdateMeBodyType) =>
    apiClient.put<UpdateMeBodyType, LoginResType>("/account/updateMe", body),
};

export default accountApiRequest;
