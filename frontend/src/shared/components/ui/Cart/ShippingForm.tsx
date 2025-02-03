import React from "react";

export default function ShippingForm() {
  return (
    <tr className="woocommerce-shipping-totals shipping">
      <th>Shipping</th>
      <td data-title="Shipping">
        <ul id="shipping_method" className="woocommerce-shipping-methods">
          <li>
            <input
              type="radio"
              name="shipping_method[0]"
              data-index={0}
              id="shipping_method_0_flat_rate1"
              defaultValue="flat_rate:1"
              className="shipping_method"
            />
            <label htmlFor="shipping_method_0_flat_rate1">
              Normal Delivery:{" "}
              <span className="woocommerce-Price-amount amount">
                <bdi>
                  <span className="woocommerce-Price-currencySymbol">$</span>
                  100.00
                </bdi>
              </span>
            </label>{" "}
          </li>
          <li>
            <input
              type="radio"
              name="shipping_method[0]"
              data-index={0}
              id="shipping_method_0_flat_rate2"
              defaultValue="flat_rate:2"
              className="shipping_method"
            />
            <label htmlFor="shipping_method_0_flat_rate2">
              Express Delivery:{" "}
              <span className="woocommerce-Price-amount amount">
                <bdi>
                  <span className="woocommerce-Price-currencySymbol">$</span>
                  500.00
                </bdi>
              </span>
            </label>{" "}
          </li>
        </ul>
        <p className="woocommerce-shipping-destination">
          Shipping to <strong>Vietnam</strong>.{" "}
        </p>
        <form className="woocommerce-shipping-calculator" method="post">
          <a href="#" className="shipping-calculator-button">
            Change address
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
            <p className="form-row form-row-wide" id="calc_shipping_city_field">
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
      </td>
    </tr>
  );
}
