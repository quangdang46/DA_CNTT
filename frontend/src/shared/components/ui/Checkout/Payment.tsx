"use client";
import { useCheckout } from "@/shared/contexts/CheckoutContext";
import React, { useState } from "react";
export default function Payment() {
  const { paymentMethod, setPaymentMethod } = useCheckout(); // Dùng hook để lấy giá trị và set giá trị
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="woocommerce-checkout-payment" id="payment">
      <ul className="wc_payment_methods payment_methods methods">
        <li className="wc_payment_method payment_method_bacs">
          <div className="payment_row">
            <input
              type="radio"
              value="QR"
              checked={paymentMethod === "QR"}
              onChange={() => {
                setPaymentMethod("QR");
              }}
            />
            <label htmlFor="payment_method_bacs">Direct bank transfer</label>
          </div>
          {paymentMethod === "QR" && (
            <div className="payment_box payment_method_bacs">
              <p>
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order won’t be
                shipped until the funds have cleared in our account.
              </p>
            </div>
          )}
        </li>

        <li className="wc_payment_method payment_method_cod">
          <div className="payment_row">
            <input
              type="radio"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={() => {
                setPaymentMethod("cash");
              }}
            />
            <label htmlFor="payment_method_cod">Cash on delivery</label>
          </div>
          {paymentMethod === "cash" && (
            <div className="payment_box payment_method_cod">
              <p>Pay with cash upon delivery.</p>
            </div>
          )}
        </li>
      </ul>

      <div className="form-row place-order">
        <p className="form-row terms wc-terms-and-conditions woocommerce-validated">
          <label className="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={isChecked}
              className="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox"
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <span>
              I’ve read and accept the{" "}
              <a
                className="woocommerce-terms-and-conditions-link"
                href="terms-and-conditions.html"
              >
                terms &amp; conditions
              </a>
            </span>
            <span className="required">*</span>
          </label>
        </p>

        <button
          type="submit"
          className="button wc-forward text-center"
          disabled={!isChecked}
        >
          Place order
        </button>
      </div>
    </div>
  );
}
