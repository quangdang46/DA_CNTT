import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getInitialWishlist = (): string[] => {
  if (typeof window !== "undefined") {
    const storedWishlist = localStorage.getItem("wishlist");

    // Kiểm tra nếu storedWishlist không phải là null
    if (storedWishlist !== null) {
      try {
        const parsedWishlist = JSON.parse(storedWishlist);

        // Kiểm tra nếu parsedWishlist là một mảng
        if (Array.isArray(parsedWishlist)) {
          return parsedWishlist;
        } else {
          console.error("Wishlist không phải là mảng, trả về mảng rỗng.");
          // Nếu không phải mảng, trả về mảng rỗng và có thể reset lại trong localStorage
          localStorage.setItem("wishlist", JSON.stringify([]));
        }
      } catch (error) {
        console.error("Lỗi khi phân tích wishlist từ localStorage", error);
        // Nếu có lỗi trong khi phân tích, trả về mảng rỗng và reset trong localStorage
        localStorage.setItem("wishlist", JSON.stringify([]));
      }
    }
  }

  return []; // Trả về mảng rỗng nếu không có wishlist hợp lệ trong localStorage
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: getInitialWishlist(),
  reducers: {
    toggleWishlist: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const index = state.indexOf(productId);

      if (index !== -1) {
        state.splice(index, 1); // Xóa nếu đã có
      } else {
        state.push(productId); // Thêm nếu chưa có
      }

      // Nếu chưa đăng nhập, lưu wishlist vào localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(state));
      }
    },
    setWishlist: (state, action: PayloadAction<string[]>) => {
      // Cập nhật wishlist vào state và localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(action.payload));
      }
      return action.payload;
    },
    loadWishlist: (state) => {
      // Lấy wishlist từ localStorage nếu người dùng chưa đăng nhập
      if (typeof window !== "undefined") {
        const storedWishlist = JSON.parse(
          localStorage.getItem("wishlist") || "[]"
        );
        return storedWishlist;
      }
      return state;
    },
  },
});

export const { toggleWishlist, setWishlist, loadWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
