/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { setError, setUser } from "@/shared/state/authSlice";
import { RootState } from "@/shared/state/store";
import { LoginBodyType } from "@/shared/types/AuthenTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import authRequestApi from "@/shared/apiRequests/auth";
import apiClient from "@/shared/config/apiClient";
const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginBodyType) => {
      const response = await authRequestApi.login(data);
      if (!response.success) {
        throw new Error(response.message); // Throw error nếu login thất bại
      }
      const guestId = localStorage.getItem("guest_id"); // Lấy guest_id từ localStorage
      if (guestId) {
        // Gọi API để gộp giỏ hàng
        await apiClient.post("/cart/merge", { guest_id: guestId });
        localStorage.removeItem("guest_id"); // Xóa guest_id sau khi gộp
      }
      return response;
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};
export default function MiniLogin() {
  const [show, setShow] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBodyType),
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Dùng hook useLogin từ react-query
  const loginMutation = useLogin();

  const onSubmit = async (data: LoginBodyType) => {
    if (loading) return;

    setLoading(true); // Set loading true khi bắt đầu submit

    try {
      const response = await loginMutation.mutateAsync(data); // Call API thông qua useMutation
      toast.success(response.message);
      if (response.success) {
        setCookie("auth_token", response.data.token, {
          maxAge: response.data.expiresAt,
          path: "/",
          domain: "localhost",
        });

        dispatch(setUser(response.data));

        setIsLogin(true);
        router.refresh();
      }
    } catch (error: any) {
      // Handle error
      dispatch(setError(error.message));
      toast.error(error.message);
    } finally {
      setLoading(false); // Set loading false khi hoàn thành
    }
  };

  useEffect(() => {
    setIsLogin(isLoggedIn);
    setHasMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!hasMounted) return null;
  if (isLogin) return null;

  return (
    <>
      <div className="woocommerce-info">
        Returning customer?
        <span
          className="showlogin"
          style={{ cursor: "pointer" }}
          onClick={() => setShow(!show)}
        >
          Click here to login
        </span>
      </div>
      <div className={show ? "collapse show" : "collapse"} id="login-form">
        <form
          method="post"
          className="woocomerce-form woocommerce-form-login login"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="before-login-text">
            Vestibulum lacus magna, faucibus vitae dui eget, aliquam fringilla.
            In et commodo elit. Class aptent taciti sociosqu ad litora.
          </p>
          <p>
            If you have shopped with us before, please enter your details in the
            boxes below. If you are a new customer, please proceed to the
            Billing &amp; Shipping section.
          </p>
          <p className="form-row form-row-first">
            <label htmlFor="email">
              Email
              <span className="required">*</span>
            </label>
            <input
              type="text"
              className="input-text"
              id="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </p>
          <p className="form-row form-row-last">
            <label htmlFor="password">
              Password
              <span className="required">*</span>
            </label>
            <input
              className="input-text"
              type="password"
              id="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}
          </p>
          <div className="clear" />
          <p className="form-row">
            <input
              type="submit"
              defaultValue="Login"
              name="login"
              className="button"
            />
          </p>
          <p className="lost_password">
            <a href="#">Lost your password?</a>
          </p>
          <div className="clear" />
        </form>
      </div>
    </>
  );
}
