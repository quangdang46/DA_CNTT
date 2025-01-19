/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import authRequestApi from "@/shared/apiRequests/auth";
import { LoginBodyType } from "@/shared/types/AuthenTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBodyType),
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: LoginBodyType) => {
    if (loading) return;

    try {
      const response = await authRequestApi.login(data);
      console.log(response);
      if (response.success) {
        toast.success(response.message);
        // Chuyển hướng đến dashboard hoặc trang khác
        router.push("/");
        router.refresh();

        setCookie("auth_token", response.data.token, {
          maxAge: response.data.expiresAt,
          path: "/",
          domain: "localhost",
        });
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="u-column1 col-1">
      <h2>Login</h2>
      <form
        method="post"
        className="woocomerce-form woocommerce-form-login login"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="before-login-text">
          Vestibulum lacus magna, faucibus vitae dui eget, aliquam fringilla. In
          et commodo elit. Class aptent taciti sociosqu ad litora.
        </p>
        <div className="form-row form-row-wide">
          <label htmlFor="email">
            Username or email address <span className="required">*</span>
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
        </div>
        <div className="form-row form-row-wide">
          <label htmlFor="password">
            Password <span className="required">*</span>
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
        </div>
        <div className="form-row">
          <button
            type="submit"
            className="woocommerce-Button button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <label
            htmlFor="rememberme"
            className="woocommerce-form__label woocommerce-form__label-for-checkbox inline"
          >
            <input
              className="woocommerce-form__input woocommerce-form__input-checkbox"
              name="rememberme"
              type="checkbox"
              id="rememberme"
              defaultValue="forever"
            />
            Remember me
          </label>
        </div>
        <p className="woocommerce-LostPassword lost_password">
          <a href="#">Lost your password?</a>
        </p>
      </form>
    </div>
  );
}
