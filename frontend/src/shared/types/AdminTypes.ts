export type PaymentType = {
  id: string;
  amount: string;
  payment_status: "success" | "failed" | "pending";
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  payment_method: string;
  created_at: string;
};

export type RevenueByHourType = {
  time: string;
  revenue: string;
};

export type DashboardType = {
  totalUser: string;
  totalProduct: string;
  totalOrder: string;
  payment: PaymentType[];
  revenueByHour: RevenueByHourType[];
};
