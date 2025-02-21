// src/types/Product.ts
import { z } from "zod";

export type ProductAttributes = {
  battery_capacity: string;
  battery_type: string;
  camera_resolution: string;
  chip: string;
  created_at: string;
  dimensions: string;
  id: number;
  operating_system: string;
  product_id: number;
  ram: string;
  storage: string;
  [key: string]: string | number;
};

export type ProductImage = {
  id: number;
  product_id: number;
  image_url: string;
};

export type ProductImageList = ProductImage[];

export type Category = {
  id: number;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  status: string;
  rating: number;
  slug: string;
  weight: number;
  review_count: number;
  attributes: ProductAttributes;
  images: ProductImageList;
  category: Category;
  category_id: number;
};

export type ProductListResType = Product[];

export const ProductSearch = z.object({
  name: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  categories: z.array(z.string()).optional(),
  page: z.number().optional(),
  sortBy: z.string().optional(),
  perPage: z.number().optional(),
});

export const ProductSearchV2 = z.object({
  name: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  categories: z.string().optional(),
  page: z.number().optional(),
  sortBy: z.string().optional(),
  perPage: z.number().optional(),
});
export type ProductSearchV2Type = z.infer<typeof ProductSearchV2>;
export type ProductSearchType = z.infer<typeof ProductSearch>;

export type ProductSearchResType = {
  data: ProductListResType;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;
};


export const productAdminSchema = z.object({
  name: z.string().min(1, "Tên sản phẩm không được để trống"),
  price: z.number().min(1, "Giá phải lớn hơn 0"),
  weight: z.number().min(0, "Trọng lượng không hợp lệ"),
  status: z.enum(["available", "out_of_stock", "discontinued"]),
  description: z.string().optional(),
  attributes: z.record(z.string(), z.string()).optional(),
  category_id: z.string().min(1, "Vui lòng chọn danh mục"),
});

export type ProductAdmin = z.infer<typeof productAdminSchema>;