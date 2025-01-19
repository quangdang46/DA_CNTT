"use client";
import { login } from "@/shared/state/authSlice";
import { AppDispatch, RootState } from "@/shared/state/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type LoginFormData = z.infer<typeof loginSchema>;
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const dispatch = useDispatch<AppDispatch>();
  const { loading: loginLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const route = useRouter();
  const onSubmit = (data: LoginFormData) => {
    dispatch(login(data));
    toast.success("Login successful");
    route.push("/");
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
            disabled={loginLoading}
          >
            {loginLoading ? "Logging in..." : "Login"}
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
