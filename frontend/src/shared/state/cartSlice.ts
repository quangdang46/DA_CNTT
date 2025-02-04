import { CartItem, DeliveryType } from "@/shared/types/CartTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  cartItems: CartItem[];
  totalPrice: number;
  deliveryType: DeliveryType;
}

// Trạng thái ban đầu
const initialState: CartState = {
  cartItems: [],
  totalPrice: 0,
  deliveryType: DeliveryType.Free,
};

// Hàm tính tổng tiền trực tiếp trong reducer
const calculateTotal = (cartItems: CartItem[], deliveryType: DeliveryType) => {
  const total = cartItems.reduce((total, item) => {
    const price =
      typeof item.product.price === "string"
        ? parseFloat(item.product.price)
        : item.product.price;
    return total + (isNaN(price) ? 0 : price * item.quantity);
  }, 0);

  // Sử dụng deliveryType từ tham số, không phải từ initialState
  switch (deliveryType) {
    case DeliveryType.Normal:
      return total + 100;
    case DeliveryType.Express:
      return total + 500;
    case DeliveryType.Free:
    default:
      return total;
  }
};

// Tạo slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload;
      state.totalPrice = calculateTotal(action.payload, state.deliveryType);
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
      state.totalPrice = calculateTotal(state.cartItems, state.deliveryType);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product_id !== action.payload
      );

      state.totalPrice = calculateTotal(state.cartItems, state.deliveryType);
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

      state.totalPrice = calculateTotal(state.cartItems, state.deliveryType);
    },
    setDeliveryType: (state, action: PayloadAction<DeliveryType>) => {
      state.deliveryType = action.payload;
      state.totalPrice = calculateTotal(state.cartItems, action.payload);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
});
export const selectTotalPrice = (state: { cart: CartState }) =>
  calculateTotal(state.cart.cartItems, state.cart.deliveryType);
export const priceDelivery = (state: { cart: CartState }) => {
  switch (state.cart.deliveryType) {
    case DeliveryType.Normal:
      return 100;
    case DeliveryType.Express:
      return 500;
    case DeliveryType.Free:
    default:
      return 0;
  }
};
// Export actions
export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setCartItems,
  setDeliveryType,
} = cartSlice.actions;

export default cartSlice.reducer;
