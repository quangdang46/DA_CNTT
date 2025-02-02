import apiClient from "@/shared/config/apiClient";
import { CartItem, GetCartResType } from "@/shared/types/CartTypes";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

interface CartState {
  cartItems: CartItem[];
  totalPrice: number;
}
// Trạng thái ban đầu
const initialState: CartState = {
  cartItems: [],
  totalPrice: 0,
};
export const refetchCart = createAsyncThunk(
  "cart/refetch",
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get<GetCartResType>("/cart");
      return response.data.items; // Lấy danh sách sản phẩm trong giỏ hàng
    } catch (error) {
      return thunkAPI.rejectWithValue("Không thể tải giỏ hàng.");
    }
  }
);
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
  extraReducers: (builder) => {
    builder
      .addCase(refetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload; // Cập nhật danh sách sản phẩm
        state.totalPrice = calculateTotalPrice(action.payload); // Tính lại tổng tiền
      })
      .addCase(refetchCart.rejected, (state, action) => {
        console.error("Lỗi khi tải giỏ hàng:", action.payload);
      });
  },
});

// Export actions
export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

function calculateTotalPrice(cartItems: CartItem[]): number {
  if (!Array.isArray(cartItems)) return 0;

  return cartItems.reduce((total, item) => {
    const price =
      typeof item.product.price === "string"
        ? parseFloat(item.product.price)
        : item.product.price;
    return total + (isNaN(price) ? 0 : price * item.quantity);
  }, 0);
}
// Input Selector: Trích xuất danh sách cartItems từ state
const selectCartItems = (state: { cart: CartState }) => state.cart.cartItems;

// Result Function: Tính tổng tiền từ cartItems
export const selectTotalPrice = createSelector(
  [selectCartItems],
  (cartItems) => {
    if (!Array.isArray(cartItems)) return 0;

    return cartItems.reduce((total, item) => {
      const price =
        typeof item.product.price === "string"
          ? parseFloat(item.product.price)
          : item.product.price;
      return total + (isNaN(price) ? 0 : price * item.quantity);
    }, 0);
  }
);
export default cartSlice.reducer;
