import { Product } from "@/shared/types/ProductTypes";
import { ResType } from "@/shared/types/resType";


// Định nghĩa kiểu CartItem (một sản phẩm trong giỏ hàng)
export interface CartItem extends Product {

  quantity: number; // Số lượng sản phẩm
}

// Định nghĩa kiểu Cart (giỏ hàng)
export interface Cart {
  items: CartItem[]; // Danh sách sản phẩm trong giỏ hàng
  total: number; // Tổng tiền của giỏ hàng
}

// Định nghĩa kiểu AddToCartRequest (request thêm sản phẩm vào giỏ hàng)
export interface AddToCartRequest {
  product_id: string; // ID sản phẩm
  quantity: number; // Số lượng sản phẩm
}

// Định nghĩa kiểu RemoveFromCartRequest (request xóa sản phẩm khỏi giỏ hàng)
export interface RemoveFromCartRequest {
  product_id: string; // ID sản phẩm cần xóa
}

// Định nghĩa kiểu UpdateQuantityRequest (request cập nhật số lượng sản phẩm)
export interface UpdateQuantityRequest {
  product_id: string; // ID sản phẩm
  quantity: number; // Số lượng mới
}

// Định nghĩa kiểu response cho API lấy giỏ hàng
export type GetCartResponse = ResType<Cart>;

// Định nghĩa kiểu response cho API thêm sản phẩm vào giỏ hàng
export type AddToCartResponse = ResType<Cart>;

// Định nghĩa kiểu response cho API xóa sản phẩm khỏi giỏ hàng
export type RemoveFromCartResponse = ResType<Cart>;

// Định nghĩa kiểu response cho API cập nhật số lượng sản phẩm
export type UpdateQuantityResponse = ResType<Cart>;

// Định nghĩa kiểu response cho API xóa toàn bộ giỏ hàng
export type ClearCartResponse = ResType<Cart>;
