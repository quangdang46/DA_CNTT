"use client";
import CheckoutItem from "@/shared/components/ui/Checkout/CheckoutItem";
import { useCheckout } from "@/shared/contexts/CheckoutContext";
import { useCart } from "@/shared/hooks/useCart";
import React from "react";

export default function SummaryCheckout() {
  const { cartItems, totalPrice } = useCart();
  const { discountAmount } = useCheckout();
  return (
    <>
      <h3 id="order_review_heading">Your order</h3>
      <div className="woocommerce-checkout-review-order" id="order_review">
        <div className="order-review-wrapper">
          <h3 className="order_review_heading">Your Order</h3>
          <table className="shop_table woocommerce-checkout-review-order-table">
            <thead>
              <tr>
                <th className="product-name">Product</th>
                <th className="product-total">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <CheckoutItem key={item.id} item={item} />
              ))}
            </tbody>
            <tfoot>
              <tr className="cart-subtotal">
                <th>Subtotal</th>
                <td data-title="Subtotal">
                  <span className="woocommerce-Price-amount amount">
                    <bdi>
                      <span className="woocommerce-Price-currencySymbol">
                        $
                      </span>
                      {totalPrice.toFixed(2)}
                    </bdi>
                  </span>
                </td>
              </tr>
              <tr className="cart-subtotal">
                {discountAmount !== 0 && (
                  <>
                    <th>Discount</th>
                    <td data-title="Discount">
                      <span className="woocommerce-Price-amount amount">
                        <bdi>
                          <span className="woocommerce-Price-currencySymbol">
                            $
                          </span>
                          {discountAmount.toFixed(2)}
                        </bdi>
                      </span>
                    </td>
                  </>
                )}
              </tr>
              <tr className="cart-subtotal">
                <th>Total</th>
                <td data-title="Subtotal">
                  <span className="woocommerce-Price-amount amount">
                    <bdi>
                      <span className="woocommerce-Price-currencySymbol">
                        $
                      </span>
                      {Math.max(totalPrice - discountAmount, 0).toFixed(2)}
                    </bdi>
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
          <div className="woocommerce-checkout-payment" id="payment">
            <ul className="wc_payment_methods payment_methods methods">
              <li className="wc_payment_method payment_method_bacs">
                <input
                  type="radio"
                  data-order_button_text=""
                  name="payment_method"
                  className="input-radio"
                  id="payment_method_bacs"
                />
                <label htmlFor="payment_method_bacs">
                  Direct bank transfer
                </label>
              </li>
              <li className="wc_payment_method payment_method_cheque">
                <input
                  type="radio"
                  data-order_button_text=""
                  name="payment_method"
                  className="input-radio"
                  id="payment_method_cheque"
                />
                <label htmlFor="payment_method_cheque">Check payments</label>
              </li>
              <li className="wc_payment_method payment_method_cod">
                <input
                  type="radio"
                  data-order_button_text=""
                  name="payment_method"
                  className="input-radio"
                  id="payment_method_cod"
                />
                <label htmlFor="payment_method_cod">Cash on delivery</label>
              </li>
            </ul>
            <div className="form-row place-order">
              <p className="form-row terms wc-terms-and-conditions woocommerce-validated">
                <label className="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    className="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox"
                  />
                  <span>
                    I’ve read and accept the
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
              >
                Place order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
