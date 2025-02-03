import ShippingForm from "@/shared/components/ui/Cart/ShippingForm";
import React from "react";
interface Props {
  discountAmount: number;
  totalPrice: number;
}
export default function CartSummary({ discountAmount, totalPrice }: Props) {
  return (
    <div className="cart-collaterals">
      <div className="cart_totals">
        <h2>Cart totals</h2>
        <table cellSpacing={0} className="shop_table shop_table_responsive">
          <tbody>
            <tr className="cart-subtotal">
              <th>Subtotal</th>
              <td data-title="Subtotal">
                <span className="woocommerce-Price-amount amount">
                  <bdi>
                    <span className="woocommerce-Price-currencySymbol">$</span>
                    {totalPrice.toFixed(2)}
                  </bdi>
                </span>
              </td>
            </tr>
            <tr className="order-total">
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
            <ShippingForm></ShippingForm>
            <tr className="order-total">
              <th>Total</th>
              <td data-title="Total">
                <strong>
                  <span className="woocommerce-Price-amount amount">
                    <bdi>
                      <span className="woocommerce-Price-currencySymbol">
                        $
                      </span>
                      {Math.max(totalPrice - discountAmount, 0).toFixed(2)}
                    </bdi>
                  </span>
                </strong>{" "}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="wc-proceed-to-checkout">
          <form className="woocommerce-shipping-calculator" method="post">
            <a href="#" className="shipping-calculator-button">
              Calculate shipping
            </a>
            <section
              className="shipping-calculator-form"
              style={{ display: "none" }}
            >
              <p
                className="form-row form-row-wide"
                id="calc_shipping_country_field"
              >
                <label
                  htmlFor="calc_shipping_country"
                  className="screen-reader-text"
                >
                  Country / region:
                </label>
                <select
                  name="calc_shipping_country"
                  id="calc_shipping_country"
                  className="country_to_state country_select"
                  rel="calc_shipping_state"
                >
                  <option value="default">Select a country / region…</option>
                  <option value="AF">Afghanistan</option>
                </select>
              </p>
              <p
                className="form-row form-row-wide"
                id="calc_shipping_state_field"
              >
                <input
                  type="hidden"
                  name="calc_shipping_state"
                  id="calc_shipping_state"
                  placeholder="State / County"
                />
              </p>
              <p
                className="form-row form-row-wide"
                id="calc_shipping_city_field"
              >
                <label
                  htmlFor="calc_shipping_city"
                  className="screen-reader-text"
                >
                  City:
                </label>
                <input
                  type="text"
                  className="input-text"
                  defaultValue=""
                  placeholder="City"
                  name="calc_shipping_city"
                  id="calc_shipping_city"
                />
              </p>
              <p
                className="form-row form-row-wide"
                id="calc_shipping_postcode_field"
              >
                <label
                  htmlFor="calc_shipping_postcode"
                  className="screen-reader-text"
                >
                  Postcode / ZIP:
                </label>
                <input
                  type="text"
                  className="input-text"
                  defaultValue=""
                  placeholder="Postcode / ZIP"
                  name="calc_shipping_postcode"
                  id="calc_shipping_postcode"
                />
              </p>
              <p>
                <button name="calc_shipping" value={1} className="button">
                  Update
                </button>
              </p>
              <input
                type="hidden"
                id="woocommerce-shipping-calculator-nonce"
                name="woocommerce-shipping-calculator-nonce"
                defaultValue="76f1bbae94"
              />
              <input
                type="hidden"
                name="_wp_http_referer"
                defaultValue="/cart/"
              />{" "}
            </section>
          </form>
          <a
            href="https://techmarket.madrasthemes.com/checkout/"
            className="checkout-button button alt wc-forward"
          >
            Proceed to checkout
          </a>
          <a
            href="https://techmarket.madrasthemes.com/shop/"
            className="back-to-shopping"
          >
            Back to Shopping
          </a>{" "}
        </div>
      </div>
    </div>
  );
}
