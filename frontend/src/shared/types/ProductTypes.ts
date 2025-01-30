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
  review_count: number;
  attributes: ProductAttributes;
  images: ProductImageList;
  category: Category;
  category_id: number;
};

export type ProductListResType = Product[];

export type ProductSearchType = {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  categories?: string[];
  page?: number;
  sortBy?: string;
  perPage?: number;
};

export type ProductSearchResType = {
  data: ProductListResType;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;
};
