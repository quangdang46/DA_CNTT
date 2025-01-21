import apiClient from "@/shared/config/apiClient";
import { AccountResType } from "@/shared/types/UserTypes";

const accountApiRequest = {
  me: () => apiClient.get<AccountResType>("/account/me"),
};

export default accountApiRequest;
