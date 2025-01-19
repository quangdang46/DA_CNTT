/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import authRequestApi from "@/shared/apiRequests/auth";
import Tick from "@/shared/components/icons/Check";
import { RegisterBodyType } from "@/shared/types/AuthenTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Register() {
  const [loading, setLoading] = useState(false);

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

  const onSubmit =async (data: RegisterBodyType) => {
    if (loading) return;
    setLoading(true);
    try {
      const response =await authRequestApi.register(data);
      if (response.success) {
        toast.success(response.message);
      }else{
        toast.error(response.message);
      }
    } catch (error:any) {
      toast.error(error.message);
    }finally{
      setLoading(false);
    }
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
            disabled={loading}
          >
            {loading ? "Loading..." : "Register"}
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
