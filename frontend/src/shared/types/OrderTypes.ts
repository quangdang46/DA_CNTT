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

export type OrderType = z.infer<typeof orderSchema>;
