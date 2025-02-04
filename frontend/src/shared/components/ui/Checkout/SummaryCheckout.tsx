import React from "react";

export default function SummaryCheckout() {
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
              <tr className="cart_item">
                <td className="product-name">
                  <strong className="product-quantity">1 ×</strong>
                  KU6470 6 Series UHD Crystal Colour HDR Smart TV&nbsp;
                </td>
                <td className="product-total">
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">£</span>
                    627.99
                  </span>
                </td>
              </tr>
              <tr className="cart_item">
                <td className="product-name">
                  <strong className="product-quantity">1 ×</strong>
                  4K Action Cam GPS&nbsp;
                </td>
                <td className="product-total">
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">£</span>
                    219.00
                  </span>
                </td>
              </tr>
              <tr className="cart_item">
                <td className="product-name">
                  <strong className="product-quantity">1 ×</strong>
                  Bluetooth on-ear PureBass Headphones&nbsp;
                </td>
                <td className="product-total">
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">£</span>
                    99.95
                  </span>
                </td>
              </tr>
              <tr className="cart_item">
                <td className="product-name">
                  <strong className="product-quantity">1 ×</strong>
                  Band Fitbit Flex&nbsp;
                </td>
                <td className="product-total">
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">£</span>
                    17.00
                  </span>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="cart-subtotal">
                <th>Subtotal</th>
                <td>
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">£</span>
                    963.94
                  </span>
                </td>
              </tr>
              <tr className="order-total">
                <th>Total</th>
                <td>
                  <strong>
                    <span className="woocommerce-Price-amount amount">
                      <span className="woocommerce-Price-currencySymbol">
                        £
                      </span>
                      963.94
                    </span>
                  </strong>
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
              <a
                href="order-received.html"
                className="button wc-forward text-center"
              >
                Place order
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
