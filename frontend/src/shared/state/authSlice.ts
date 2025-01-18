/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "@/shared/config/apiClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "cookies-next";
interface AuthState {
  user: Record<string, any> | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Async action: Đăng nhập
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`/auth/login`, credentials);
      const { token, user } = response.data.data;
      setCookie("auth_token", token, { maxAge: 7 * 24 * 60 * 60, path: "/" });

      return { user, token }; // Trả về dữ liệu user và token
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || "Login failed");
    }
  }
);

// Async action: Đăng ký
export const register = createAsyncThunk(
  "auth/register",
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`/auth/register`, data);
      return response.data.data; // Trả về dữ liệu user
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Async action: Đăng xuất
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth }: { auth: AuthState } = getState() as { auth: AuthState }; // Lấy token từ state
      await apiClient.post(
        `/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      return true; // Trả về trạng thái đăng xuất thành công
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || "Logout failed");
    }
  }
);

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth }: { auth: AuthState } = getState() as { auth: AuthState };
      const token = auth.token || getCookie("auth_token");
      if (!token) throw new Error("Token not found");
      console.log("Token:", token);
      const response = await apiClient.get(`/auth/me`);
      console.log("Response data:", response.data);
      return response.data.data.user; // Trả về thông tin người dùng
    } catch (error: any) {
      console.log("Error fetching user data:", error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch user data"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  } as AuthState,
  reducers: {
    setAuth(state, action) {
      console.log("action.payload setAuth", action.payload);
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearAuth(state) {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Xử lý register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Xử lý logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      })

      // Xử lý fetchUserData
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
