import { Product } from "@/shared/types/ProductTypes";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem extends Product {
  quantity: number; // Số lượng sản phẩm trong giỏ hàng
}

// Định nghĩa kiểu CartState
interface CartState {
  cartItems: CartItem[];
}

// Trạng thái ban đầu
const initialState: CartState = {
  cartItems: [],
};

// Tạo slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Thêm sản phẩm vào giỏ hàng
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingProduct = state.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1; // Tăng số lượng nếu sản phẩm đã tồn tại
      } else {
        state.cartItems.push({ ...product, quantity: 1 }); // Thêm sản phẩm mới với quantity = 1
      }
    },

    // Xóa sản phẩm khỏi giỏ hàng
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== productId);
    },

    // Cập nhật số lượng sản phẩm
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const product = state.cartItems.find((item) => item.id === id);

      if (product) {
        product.quantity = quantity; // Cập nhật số lượng
      }
    },

    // Xóa toàn bộ giỏ hàng
    clearCart: (state) => {
      state.cartItems = []; // Xóa tất cả sản phẩm trong giỏ hàng
    },
  },
});

// Export actions
export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
// Selector để tính tổng tiền
export const selectTotalPrice = createSelector(
  (state: { cart: CartState }) => state.cart.cartItems, // Lấy danh sách cartItems
  (cartItems) =>
    cartItems.reduce((total, item) => {
      const price =
        typeof item.price === "string" ? parseFloat(item.price) : item.price; // Chuyển đổi giá thành số
      return total + (isNaN(price) ? 0 : price * item.quantity); // Tính tổng tiền
    }, 0)
);
// Export reducer
export default cartSlice.reducer;
