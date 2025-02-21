import { CartItem } from "@/shared/types/CartTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  cartItems: CartItem[];
  totalPrice: number;
  shippingFees: {
    normal: number;
    express: number;
    free: number;
  };
  selectedShippingFee: "normal" | "express" | "free";
}

// Trạng thái ban đầu
const initialState: CartState = {
  cartItems: [],
  totalPrice: 0,
  shippingFees: {
    normal: 0,
    express: 0,
    free: 0,
  },
  selectedShippingFee: "free",
};

// Hàm tính tổng tiền trực tiếp trong reducer
const calculateTotal = (
  cartItems: CartItem[],
  shippingFees: { normal: number; express: number; free: number },
  selectedShippingFee: "normal" | "express" | "free"
) => {
  const total = cartItems.reduce((total, item) => {
    const price =
      typeof item.product.price === "string"
        ? parseFloat(item.product.price)
        : item.product.price;
    return total + (isNaN(price) ? 0 : price * item.quantity);
  }, 0);

  return total + shippingFees[selectedShippingFee];
};

// Tạo slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload;
      state.totalPrice = calculateTotal(
        action.payload,
        state.shippingFees,
        state.selectedShippingFee
      );
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
      state.totalPrice = calculateTotal(
        state.cartItems,
        state.shippingFees,
        state.selectedShippingFee
      );
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product_id !== action.payload
      );

      state.totalPrice = calculateTotal(
        state.cartItems,
        state.shippingFees,
        state.selectedShippingFee
      );
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

      state.totalPrice = calculateTotal(
        state.cartItems,
        state.shippingFees,
        state.selectedShippingFee
      );
    },
    setShippingFees: (
      state,
      action: PayloadAction<{ normal: number; express: number; free: number }>
    ) => {
      state.shippingFees = action.payload;
      state.totalPrice = calculateTotal(
        state.cartItems,
        action.payload,
        state.selectedShippingFee
      );
    },
    setSelectedShippingFee: (
      state,
      action: PayloadAction<"normal" | "express" | "free">
    ) => {
      state.selectedShippingFee = action.payload;
      state.totalPrice = calculateTotal(
        state.cartItems,
        state.shippingFees,
        action.payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
});
export const selectTotalPrice = (state: { cart: CartState }) =>
  calculateTotal(
    state.cart.cartItems,
    state.cart.shippingFees,
    state.cart.selectedShippingFee
  );
export const shippingFees = (state: { cart: CartState }) => {
  return state.cart.shippingFees[state.cart.selectedShippingFee];
};
// Export actions
export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setCartItems,
  setShippingFees,
  setSelectedShippingFee,
} = cartSlice.actions;

export default cartSlice.reducer;
