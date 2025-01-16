"use client";
import Tick from "@/shared/components/icons/Check";
import { register } from "@/shared/state/authSlice";
import { AppDispatch, RootState } from "@/shared/state/store";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
// Define the validation schema with Zod
const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  password_confirmation: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;
export default function Register() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const { loading:registerLoading } = useSelector((state: RootState) => state.auth);

  const onSubmit = (data: RegisterFormData) => {
    // Dispatch the register action to Redux
    dispatch(register(data));
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
            disabled={registerLoading}
          >
            {registerLoading ? "Loading..." : "Register"}
          </button>
        </div>
        <div className="register-benefits">
          <h3>Sign up today and you will be able to :</h3>
          <ul>
            <li>
              <Tick></Tick> Speed your way through checkout
            </li>
            <li>
              <Tick></Tick> Track your orders easily
            </li>
            <li>
              <Tick></Tick> Keep a record of all your purchases
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
}
