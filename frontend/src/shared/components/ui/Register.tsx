/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import authRequestApi from "@/shared/apiRequests/auth";
import { RegisterBodyType } from "@/shared/types/AuthenTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: RegisterBodyType) => {
      const response = await authRequestApi.register(data);

      if (!response.success) {
        throw new Error(response.message);
      }

      // if (!response.success) {
      //   if (response.errors && response.errors.email) {
      //     throw new Error(response.errors.email[0]); // Lấy thông báo lỗi email
      //   }
      //   throw new Error(response.message); // Nếu có lỗi chung, throw lỗi chung
      // }

      return response;
    },
    onSuccess: (response) => {
      toast.success(response.message);
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export default function Register() {
  const registerMutation = useRegister();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBodyType),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = (data: RegisterBodyType) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="u-column2 col-2">
      <h2>Register</h2>
      <form
        className="register"
        method="post"
        onSubmit={handleSubmit(onSubmit)} // Handle form submission
      >
        <p className="before-register-text">
          Create new account today to reap the benefits of a personalized
          shopping experience. Praesent placerat, est sed aliquet finibus.
        </p>
        <div className="form-row form-row-wide">
          <label htmlFor="name">
            Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            {...formRegister("name")}
            className="woocommerce-Input woocommerce-Input--text input-text"
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>
        <div className="form-row form-row-wide">
          <label htmlFor="reg_email">
            Email address <span className="required">*</span>
          </label>
          <input
            type="text"
            id="reg_email"
            {...formRegister("email")}
            className="woocommerce-Input woocommerce-Input--text input-text"
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <div className="form-row form-row-wide">
          <label htmlFor="re_password">
            Password <span className="required">*</span>
          </label>
          <input
            type="password"
            id="re_password"
            className="woocommerce-Input woocommerce-Input--text input-text"
            {...formRegister("password")}
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
        <div className="form-row form-row-wide">
          <label htmlFor="password_confirmation">
            Password Confirmation <span className="required">*</span>
          </label>
          <input
            type="password"
            id="password_confirmation"
            className="woocommerce-Input woocommerce-Input--text input-text"
            {...formRegister("password_confirmation")}
          />
          {errors.password_confirmation && (
            <p className="text-danger">
              {errors.password_confirmation.message}
            </p>
          )}
        </div>
        <div className="form-row">
          <button
            type="submit"
            className="woocommerce-Button button"
            name="register"
            value="Register"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? "Loading..." : "Register"}
          </button>
        </div>
        <div className="register-benefits">
          <h3>Sign up today and you will be able to :</h3>
          <ul>
            <li>
              <Check strokeWidth={1} /> Speed your way through checkout
            </li>
            <li>
              <Check strokeWidth={1} /> Track your orders easily
            </li>
            <li>
              <Check strokeWidth={1} /> Keep a record of all your purchases
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
}
