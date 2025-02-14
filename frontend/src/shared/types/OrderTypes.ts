import { ResType } from "@/shared/types/resType";
import { z } from "zod";

const addressSchema = z.object({
  address: z.string().min(1, "Address is required"),
  province: z.object({
    name: z.string().min(1, "Province is required"),
  }),
  district: z.object({
    name: z.string().min(1, "District is required"),
  }),
  ward: z.object({
    name: z.string().min(1, "Ward is required"),
  }),
});

const orderItemSchema = z.object({
  product_id: z.number().int().positive("Invalid product ID"),
  quantity: z.number().int().positive("Quantity must be greater than 0"),
  price: z.number().nonnegative("Price must be >= 0"),
  name: z.string().min(1, "Product name is required"),
});

export const orderSchema = z.object({
  customer_details: z.string().min(1, "Customer name is required"),
  customer_email: z.string().email("Invalid email format"),
  customer_phone: z.string().min(10, "Invalid phone number"),
  address_id: z.number().optional(),
  note: z.string().optional(),
  shipping_address: addressSchema.optional(),
  total_price: z.number().nonnegative("Total price must be >= 0"),
  payment_method: z.string().min(1, "Payment method is required"),
  shipping_fee: z.number().nonnegative("Shipping fee must be >= 0"),
  coupon_code: z.string().optional(),
  payment_gateway: z.string().min(1, "Payment gateway is required"),
  shipping_partner: z.string().min(1, "Shipping partner is required"),
  order_items: z
    .array(orderItemSchema)
    .nonempty("At least one item is required"),
});

export const orderGetItemSchema = z.object({
  id: z.number(),
  tracking_code: z.string().nullable(),
  tracking_url: z.string().url().nullable(),
  user_id: z.number().nullable(),
  guest_id: z.number().nullable(),
  customer_name: z.string(),
  customer_email: z.string().email(),
  customer_phone: z.string(),
  total_price: z.string(),
  status: z.string().nullable(),
  shipping_status: z.string().nullable(),
  shipping_partner: z.string().nullable(),
  shipped_at: z.string().nullable().nullable(),
  delivered_at: z.string().nullable().nullable(),
  returned_at: z.string().nullable().nullable(),
  shipping_fee: z.string().nullable(),
  estimated_deliver_time: z.string().nullable().nullable(),
  payment_status: z.string().nullable(),
  payment_method: z.string().nullable(),
  payment_gateway: z.string().nullable(),
  transaction_id: z.string().nullable(),
  order_time: z.string(),
  delivery_time: z.string().nullable(),
  cancel_time: z.string().nullable(),
  address_id: z.number().nullable(),
  note: z.string().nullable(),
});

export type OrderItemType = z.infer<typeof orderGetItemSchema>;
export type OrderGetResType = ResType<OrderItemType[]>;
export type OrderType = z.infer<typeof orderSchema>;
export const orderGetItemSchemav2 = z.object({
  id: z.string(),
  tracking_code: z.string().nullable(),
  customer_name: z.string(),
  customer_email: z.string().email(),
  customer_phone: z.string(),
  total_price: z.number(), // Changed to number
  status: z.enum(["processing", "delivered", "canceled"]).nullable(),
  shipping_status: z
    .enum(["pending", "shipped", "delivered", "returned", "canceled"])
    .nullable(),
  shipping_fee: z.number().nullable(), // Changed to number
  payment_status: z.string().nullable(),
  payment_method: z.string().nullable(), // Added
  order_time: z.string(),
  note: z.string().nullable(),
});

export type OrderItemTypeV2 = z.infer<typeof orderGetItemSchemav2>;
export type OrderAdminResType = {
  data: OrderItemTypeV2[];
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;
};

export type OrderBodyAdmin = {
  shipping_status?:
    | "pending"
    | "shipped"
    | "delivered"
  status?: "processing" | "delivered" | "canceled";
};


