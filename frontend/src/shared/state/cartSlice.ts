
import { CartItem } from "@/shared/types/CartTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  cartItems: CartItem[];
  totalPrice: number;
}

// Trạng thái ban đầu
const initialState: CartState = {
  cartItems: [],
  totalPrice: 0,
};

// Hàm tính tổng tiền trực tiếp trong reducer
const calculateTotal = (cartItems: CartItem[]) =>
  cartItems.reduce((total, item) => {
    const price =
      typeof item.product.price === "string"
        ? parseFloat(item.product.price)
        : item.product.price;
    return total + (isNaN(price) ? 0 : price * item.quantity);
  }, 0);

// Tạo slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload;
      state.totalPrice = calculateTotal(action.payload);
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const product = action.payload;
      const existingProduct = state.cartItems.find(
        (item) => item.product_id === product.product_id
      );

      if (existingProduct) {
        existingProduct.quantity += product.quantity || 1;
      } else {
        state.cartItems.push({ ...product, quantity: product.quantity || 1 });
      }

      // Cập nhật tổng tiền ngay trong reducer
      state.totalPrice = calculateTotal(state.cartItems);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product_id !== action.payload
      );

      state.totalPrice = calculateTotal(state.cartItems);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ product_id: string; quantity: number }>
    ) => {
      const { product_id, quantity } = action.payload;
      const product = state.cartItems.find(
        (item) => item.product_id === product_id
      );

      if (product) {
        product.quantity = quantity;
      }

      state.totalPrice = calculateTotal(state.cartItems);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
});

// Export actions
export const { addToCart, removeFromCart, updateQuantity, clearCart, setCartItems } =
  cartSlice.actions;

export default cartSlice.reducer;
