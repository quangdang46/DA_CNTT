export type PaymentType = {
  id: number;
  amount: string;
  payment_status: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
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
