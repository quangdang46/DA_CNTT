"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
export default function Payment() {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const { control } = useForm();
  return (
    <div className="woocommerce-checkout-payment" id="payment">
      <ul className="wc_payment_methods payment_methods methods">
        <li className="wc_payment_method payment_method_bacs">
          <div className="payment_row">
            <Controller
              name="payment_method"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="radio"
                    {...field}
                    value="QR"
                    checked={selectedPayment === "bacs"}
                    onChange={() => {
                      setSelectedPayment("bacs");
                      field.onChange("QR"); // Cập nhật giá trị cho field
                    }}
                  />
                  <label htmlFor="payment_method_bacs">
                    Direct bank transfer
                  </label>
                </>
              )}
            />
          </div>

          {selectedPayment === "bacs" && (
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
            
            <Controller
              name="payment_method"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="radio"
                    {...field}
                    value="cash"
                    checked={selectedPayment === "cod"}
                    onChange={() => {
                      setSelectedPayment("cod");
                      field.onChange("cash"); // Cập nhật giá trị cho field
                    }}
                  />
                  <label htmlFor="payment_method_cod">Cash on delivery</label>
                </>
              )}
            />
          </div>
          {selectedPayment === "cod" && (
            <div className="payment_box payment_method_cod">
              <p>Pay with cash upon delivery.</p>
            </div>
          )}
        </li>
      </ul>

      <div className="form-row place-order">
        <p className="form-row terms wc-terms-and-conditions woocommerce-validated">
          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <label className="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox">
                <input
                  {...field}
                  type="checkbox"
                  id="terms"
                  className="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox"
                  checked={isChecked}
                  onChange={(e) => {
                    setIsChecked(e.target.checked);
                    field.onChange(e.target.checked);
                  }}
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
            )}
          />
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
