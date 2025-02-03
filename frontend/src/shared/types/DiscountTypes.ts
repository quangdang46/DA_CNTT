/*
    "discount_code": "DISCOUNT10",
    "target_type": "order",
    "target_id": "temp_order_123", // ID tạm thời của đơn hàng
    "total_amount": 500 // Tổng giá trị đơn hàng tạm thời
*/

export type DiscountType = {
  discount_code: string;
  target_type: string;
  target_id: string;
  total_amount: number;
};

export type DiscountResType = {
  discount_amount: number;
  new_total_amount: number;
  message: string;
  success: boolean;
};