import React from "react";

export default function OrderForm() {
  return (
    <form
      action="#"
      className="checkout woocommerce-checkout"
      method="post"
      name="checkout"
    >
      <div id="customer_details" className="col2-set">
        <div className="col-1">
          <div className="woocommerce-billing-fields">
            <h3>Billing Details</h3>
            <div className="woocommerce-billing-fields__field-wrapper-outer">
              <div className="woocommerce-billing-fields__field-wrapper">
                <p
                  id="billing_first_name_field"
                  className="form-row form-row-wide validate-required woocommerce-invalid woocommerce-invalid-required-field"
                >
                  <label className="" htmlFor="billing_first_name">
                    First Name
                    <abbr title="required" className="required">
                      *
                    </abbr>
                  </label>
                  <input
                    type="text"
                    defaultValue=""
                    placeholder=""
                    id="billing_first_name"
                    name="billing_first_name"
                    className="input-text"
                  />
                </p>

                <p
                  id="billing_phone_field"
                  className="form-row form-row-last validate-required validate-phone"
                >
                  <label className="" htmlFor="billing_phone">
                    Phone
                    <abbr title="required" className="required">
                      *
                    </abbr>
                  </label>
                  <input
                    type="tel"
                    defaultValue=""
                    placeholder=""
                    id="billing_phone"
                    name="billing_phone"
                    className="input-text"
                  />
                </p>
                <p
                  id="billing_email_field"
                  className="form-row form-row-first validate-required validate-email"
                >
                  <label className="" htmlFor="billing_email">
                    Email Address
                    <abbr title="required" className="required">
                      *
                    </abbr>
                  </label>
                  <input
                    type="email"
                    defaultValue=""
                    placeholder=""
                    id="billing_email"
                    name="billing_email"
                    className="input-text"
                  />
                </p>
                <div className="clear" />
                <p
                  id="billing_address_1_field"
                  className="form-row form-row-wide address-field validate-required"
                >
                  <label className="" htmlFor="billing_address_1">
                    Street address
                    <abbr title="required" className="required">
                      *
                    </abbr>
                  </label>
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Street address"
                    id="billing_address_1"
                    name="billing_address_1"
                    className="input-text"
                  />
                </p>
                <p id="order_comments_field" className="form-row notes">
                  <label className="" htmlFor="order_comments">
                    Order notes
                  </label>
                  <textarea
                    cols={5}
                    rows={5}
                    placeholder="Notes about your order, e.g. special notes for delivery."
                    id="order_comments"
                    className="input-text"
                    name="order_comments"
                    defaultValue={""}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
          {/* /.woocommerce-checkout-review-order-table */}
          <div className="woocommerce-checkout-payment" id="payment">
            <ul className="wc_payment_methods payment_methods methods">
              <li className="wc_payment_method payment_method_bacs">
                <input
                  type="radio"
                  data-order_button_text=""
                  defaultValue="bacs"
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
                  defaultValue="cheque"
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
                  defaultValue="cod"
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
                <input type="hidden" defaultValue={1} name="terms-field" />
              </p>
              <a
                href="order-received.html"
                className="button wc-forward text-center"
              >
                Place order
              </a>
            </div>
          </div>
          {/* /.woocommerce-checkout-payment */}
        </div>
        {/* /.order-review-wrapper */}
      </div>
      {/* .woocommerce-checkout-review-order */}
    </form>
  );
}
