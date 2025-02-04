"use client";
import React, { useState } from "react";

export default function MiniCoupon() {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="woocommerce-info">
        Have a coupon?
        <span
          style={{ cursor: "pointer" }}
          className="showlogin"
          onClick={() => setShow(!show)}
        >
          Click here to enter your code
        </span>
      </div>
      <div
        className={show ? "collapse show" : "collapse"}
        id="checkoutCouponForm"
      >
        <form method="post" className="checkout_coupon">
          <p className="form-row form-row-first">
            <input
              type="text"
              defaultValue=""
              id="coupon_code"
              placeholder="Coupon code"
              className="input-text"
              name="coupon_code"
            />
          </p>
          <p className="form-row form-row-last">
            <input
              type="submit"
              defaultValue="Apply coupon"
              name="apply_coupon"
              className="button"
            />
          </p>
          <div className="clear" />
        </form>
      </div>
    </>
  );
}
