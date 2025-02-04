"use client";
import { RootState } from "@/shared/state/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function MiniLogin() {
  const [show, setShow] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  useEffect(() => {
    setIsLogin(isLoggedIn);
    setHasMounted(true);
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
            <label htmlFor="username">
              Username or email
              <span className="required">*</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="input-text"
            />
          </p>
          <p className="form-row form-row-last">
            <label htmlFor="password">
              Password
              <span className="required">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="input-text"
            />
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
