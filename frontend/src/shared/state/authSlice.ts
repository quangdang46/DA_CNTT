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
    setUser(state, action: PayloadAction<Partial<LoginResType>>) {
      // state.user = action.payload.user;
      state.isLoggedIn = true;
      // state.token = action.payload.token;

      state.loading = false;
      state.error = null;
      // // Lưu thông tin người dùng vào localStorage
      // if (typeof window !== "undefined") {
      //   localStorage.setItem("user", JSON.stringify(action.payload.user));
      //   localStorage.setItem("auth_token", action.payload.token); // Thêm token vào localStorage
      // }

      // Cập nhật chỉ thông tin người dùng
      if (action.payload.user) {
        state.user = { ...state.user, ...action.payload.user }; // Giữ nguyên các giá trị cũ trong `user` nếu không có thay đổi
      }

      // Cập nhật token
      if (action.payload.token) {
        state.token = action.payload.token;
      }

      // Không thay đổi `isLoggedIn`, `token`, `loading`, và `error`
      if (typeof window !== "undefined") {
        if (action.payload.user) {
          localStorage.setItem(
            "user",
            JSON.stringify({ ...state.user, ...action.payload.user })
          );
        }
        if (action.payload.token) {
          localStorage.setItem("auth_token", action.payload.token); // Chỉ lưu token nếu có
        }
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
