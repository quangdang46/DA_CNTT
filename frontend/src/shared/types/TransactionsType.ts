import { PaymentType } from "@/shared/types/AdminTypes";

export type TransactionAdminResType = {
  data: PaymentType[];
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;
};

export type TransactionBodyAdmin = {
  payment_status?: "success" | "failed" | "pending";

};