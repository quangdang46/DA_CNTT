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
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setUser(state, action: PayloadAction<Partial<LoginResType>>) {
      state.isLoggedIn = true;

      state.loading = false;
      state.error = null;

      if (action.payload.user) {
        state.user = { ...state.user, ...action.payload.user }; 
      }

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
          localStorage.setItem("auth_token", action.payload.token); 
        }
      }
    },
    setLogout(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
      state.loading = false; 
      state.error = null;
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
