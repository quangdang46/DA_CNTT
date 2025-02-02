
import { Product } from "@/shared/types/ProductTypes";
import { ResType } from "@/shared/types/resType";

// Base response for all API responses

// Cart item base
export interface CartItemBase {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
}

// Cart item with product details
export interface CartItem extends CartItemBase {
  product: Product;
}

// Cart item response
export interface CartItemRes extends CartItemBase {
  product: Product;
}

// Cart structure
export interface Cart {
  id: string;
  user_id: string;
  guest_id: string;
  items: CartItem[];
}

// Response types
export type GetCartResType = ResType<Cart>;
export type AddToCartResType = ResType<CartItemRes>;

export interface RemoveFromCartData {
  message: string;
  success: boolean;
}

export type RemoveFromCartResType = ResType<RemoveFromCartData>;
export type ClearCartResType = ResType<RemoveFromCartData>;

// Request bodies
export interface AddToCartBody {
  product_id: string;
  quantity: number;
}

export interface CartRemoveBody {
  product_id?: string;
}

export type ClearCartBody = CartRemoveBody;
