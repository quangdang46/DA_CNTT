// src/types/Product.ts

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

export type ProductAttributesList = ProductAttributes[];

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
  id: number;
  name: string;
  description: string;
  price: number;
  status: string;
  rating: number;
  slug: string;
  review_count: number;
  attributes: ProductAttributesList;
  images: ProductImageList;
  category: Category;
  category_id: number;
};

export type ProductListResType = Product[];
