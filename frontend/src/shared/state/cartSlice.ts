
import { CartItem } from "@/shared/types/CartTypes";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  cartItems: CartItem[];
  totalPrice: number;
}
// Trạng thái ban đầu
const initialState: CartState = {
  cartItems: [],
  totalPrice: 0,
};

// Tạo slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Thêm sản phẩm vào giỏ hàng
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const product = action.payload;
      const existingProduct = state.cartItems.find(
        (item) => item.product_id === product.product_id
      );
      if (existingProduct) {
        existingProduct.quantity += product.quantity || 1; // Tăng số lượng nếu sản phẩm đã tồn tại
      } else {
        state.cartItems.push({ ...product, quantity: product.quantity || 1 }); // Thêm sản phẩm mới
      }
      // Cập nhật tổng tiền
      state.totalPrice = calculateTotalPrice(state.cartItems);
    },

    // Xóa sản phẩm khỏi giỏ hàng
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.product_id !== productId
      );
      // Cập nhật tổng tiền
      state.totalPrice = calculateTotalPrice(state.cartItems);
    },

    // Cập nhật số lượng sản phẩm
    updateQuantity: (
      state,
      action: PayloadAction<{ product_id: string; quantity: number }>
    ) => {
      const { product_id, quantity } = action.payload;
      const product = state.cartItems.find(
        (item) => item.product_id === product_id
      );
      if (product) {
        product.quantity = quantity; // Cập nhật số lượng
      }
      // Cập nhật tổng tiền
      state.totalPrice = calculateTotalPrice(state.cartItems);
    },

    // Xóa toàn bộ giỏ hàng
    clearCart: (state) => {
      state.cartItems = []; // Xóa tất cả sản phẩm trong giỏ hàng
      state.totalPrice = 0; // Reset tổng tiền về 0
    },
  },
});

// Export actions
export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

// Hàm tính tổng tiền
function calculateTotalPrice(cartItems: CartItem[]): number {
  return cartItems.reduce((total, item) => {
    const price =
      typeof item.product.price === "string"
        ? parseFloat(item.product.price)
        : item.product.price;
    return total + (isNaN(price) ? 0 : price * item.quantity);
  }, 0);
}
// Selector để lấy tổng tiền
export const selectTotalPrice = createSelector(
  (state: { cart: CartState }) => state.cart.totalPrice,
  (totalPrice) => totalPrice
);
// Export reducer
export default cartSlice.reducer;
