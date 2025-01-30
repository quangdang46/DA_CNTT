// compareSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/shared/types/ProductTypes";

interface CompareState {
  selectedProducts: Product[];
  maxCompare: number;
}

const initialState: CompareState = {
  selectedProducts: [],
  maxCompare: 3,
};

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addToCompare: (state, action: PayloadAction<Product>) => {
      if (
        state.selectedProducts.length < state.maxCompare &&
        !state.selectedProducts.some((p) => p.id === action.payload.id)
      ) {
        state.selectedProducts.push(action.payload);
      }
    },
    removeFromCompare: (state, action: PayloadAction<string>) => {
      state.selectedProducts = state.selectedProducts.filter(
        (p) => p.id !== action.payload
      );
    },
    clearCompare: (state) => {
      state.selectedProducts = [];
    },
  },
});

export const { addToCompare, removeFromCompare, clearCompare } =
  compareSlice.actions;

export default compareSlice.reducer;
