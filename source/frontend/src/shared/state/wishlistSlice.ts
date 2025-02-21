// wishlistSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Lấy wishlist từ localStorage nếu chưa đăng nhập
const getInitialWishlist = (): string[] => {
  if (typeof window !== "undefined") {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      try {
        const parsedWishlist = JSON.parse(storedWishlist);
        // Kiểm tra lại nếu là mảng
        if (Array.isArray(parsedWishlist)) {
          return parsedWishlist;
        }
      } catch (error) {
        console.error("Error parsing wishlist from localStorage", error);
      }
    }
  }
  return [];
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: getInitialWishlist(),
  reducers: {
    toggleWishlist: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const index = state.indexOf(productId);

      if (index !== -1) {
        state.splice(index, 1); // Xóa nếu có
      } else {
        state.push(productId); // Thêm nếu chưa có
      }

      if (typeof window !== "undefined") {
        // Cập nhật localStorage nếu người dùng chưa đăng nhập
        localStorage.setItem("wishlist", JSON.stringify(state));
      }
    },
    setWishlist: (state, action: PayloadAction<string[]>) => {
      // Cập nhật wishlist từ server và lưu vào localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(action.payload));
      }
      return action.payload;
    },
    loadWishlist: (state, action: PayloadAction<string[]>) => {
      // Lấy wishlist từ server (khi người dùng đăng nhập) hoặc từ localStorage
      return action.payload || state;
    },
  },
});

export const { toggleWishlist, setWishlist, loadWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
