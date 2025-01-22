import { LoginResType } from "@/shared/types/AuthenTypes";
import { UserResType } from "@/shared/types/UserTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  user: UserResType | null;
  error: string | null;
  token: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  error: null,
  token: null,
  loading: false,
};
// Kiểm tra và khôi phục thông tin người dùng từ localStorage nếu có
const userFromLocalStorage =
  typeof window !== "undefined" ? localStorage.getItem("user") : null;
const tokenFromLocalStorage =
  typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
const initialStateFromLocalStorage =
  userFromLocalStorage && tokenFromLocalStorage
    ? {
        isLoggedIn: true,
        user: JSON.parse(userFromLocalStorage),
        error: null,
        token: tokenFromLocalStorage,
        loading: false,
      }
    : initialState;

const authSlice = createSlice({
  name: "auth",
  initialState: initialStateFromLocalStorage,
  reducers: {
    // Khi bắt đầu một hành động, bật trạng thái loading
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setUser(state, action: PayloadAction<LoginResType>) {
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.token = action.payload.token;

      state.loading = false; // Tắt trạng thái loading
      state.error = null; // Xóa lỗi (nếu có)
      // Lưu thông tin người dùng vào localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("auth_token", action.payload.token); // Thêm token vào localStorage
      }
    },
    setLogout(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
      state.loading = false; // Tắt trạng thái loading
      state.error = null; // Xóa lỗi
      // Xóa thông tin người dùng và token khỏi localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("auth_token");
      }
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setUser, setError, setLogout } = authSlice.actions;

export default authSlice.reducer;
