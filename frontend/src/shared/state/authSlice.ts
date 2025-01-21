import { LoginResType } from "@/shared/types/AuthenTypes";
import { UserResType } from "@/shared/types/UserTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  user: UserResType | null;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  error: null,
};
// Kiểm tra và khôi phục thông tin người dùng từ localStorage nếu có
const userFromLocalStorage =
  typeof window !== "undefined" ? localStorage.getItem("user") : null;
const initialStateFromLocalStorage = userFromLocalStorage
  ? {
      isLoggedIn: true,
      user: JSON.parse(userFromLocalStorage),
      error: null,
    }
  : initialState;

const authSlice = createSlice({
  name: "auth",
  initialState: initialStateFromLocalStorage,
  reducers: {
    setUser(state, action: PayloadAction<LoginResType>) {
      console.log("action.payload", action.payload);
      state.user = action.payload.user;
      state.isLoggedIn = true;
      // Lưu thông tin người dùng vào localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("auth_token", action.payload.token); // Thêm token vào localStorage
      }
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      // Xóa thông tin người dùng và token khỏi localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("auth_token");
      }
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { setUser, setError } = authSlice.actions;

export default authSlice.reducer;
