import { useTabs } from "@/shared/contexts/TabsContext";
import React from "react";

export default function AddressTab() {
  const { activeTab } = useTabs();
  return (
    <div
      className="woocommerce-MyAccount-content"
      style={
        activeTab === "account-address"
          ? { display: "block" }
          : { display: "none" }
      }
    >
      <div className="woocommerce-notices-wrapper"></div>
      <p>
        The following addresses will be used on the checkout page by default.
      </p>

      <div className="u-columns woocommerce-Addresses col2-set addresses">
        <div className="u-column1 col-1 woocommerce-Address">
          <header className="woocommerce-Address-title title align-items-end">
            <h2>Billing address</h2>
          </header>
          <address>You have not set up this type of address yet.</address>
        </div>
      </div>

      <form method="post">
        <h2>Billing address</h2>
        <div className="woocommerce-address-fields">
          <div className="woocommerce-address-fields__field-wrapper">
            <p
              className="form-row form-row-wide address-field validate-required"
              id="billing_address_1_field"
              data-priority="50"
            >
              <label htmlFor="billing_address_1">
                Street address&nbsp;
                <abbr className="required" title="required">
                  *
                </abbr>
              </label>
              <span className="woocommerce-input-wrapper">
                <input
                  type="text"
                  className="input-text"
                  name="billing_address_1"
                  id="billing_address_1"
                  placeholder="House number and street name"
                  value=""
                  aria-required="true"
                  autoComplete="address-line1"
                />
              </span>
            </p>

            <p
              className="form-row form-row-wide address-field"
              id="billing_address_2_field"
              data-priority="60"
            >
              <label htmlFor="billing_address_2" className="screen-reader-text">
                Apartment, suite, unit, etc.&nbsp;
                <span className="optional">(optional)</span>
              </label>
              <span className="woocommerce-input-wrapper">
                <input
                  type="text"
                  className="input-text"
                  name="billing_address_2"
                  id="billing_address_2"
                  placeholder="Apartment, suite, unit, etc. (optional)"
                  value=""
                  autoComplete="address-line2"
                />
              </span>
            </p>

            <p
              className="form-row form-row-wide address-field validate-required"
              id="billing_city_field"
              data-priority="70"
            >
              <label htmlFor="billing_city">
                Town / City&nbsp;
                <abbr className="required" title="required">
                  *
                </abbr>
              </label>
              <span className="woocommerce-input-wrapper">
                <input
                  type="text"
                  className="input-text"
                  name="billing_city"
                  id="billing_city"
                  placeholder=""
                  value=""
                  aria-required="true"
                  autoComplete="address-level2"
                />
              </span>
            </p>
            <p
              className="form-row form-row-wide address-field validate-required validate-state"
              id="billing_state_field"
              data-priority="80"
            >
              <label htmlFor="billing_state" className="">
                State&nbsp;
                <abbr className="required" title="required">
                  *
                </abbr>
              </label>
              <span className="woocommerce-input-wrapper">
                <select
                  name="billing_state"
                  id="billing_state"
                  className="state_select select2-hidden-accessible"
                  aria-required="true"
                  data-placeholder="Select an option…"
                  data-label="State"
                  aria-hidden="true"
                >
                  <option value="">Select an option…</option>
                </select>
                <span
                  className="select2 select2-container select2-container--default select2-container--below"
                  dir="ltr"
                  style={{ width: "100" }}
                >
                  <span className="selection">
                    <span
                      className="select2-selection select2-selection--single"
                      aria-haspopup="true"
                      aria-expanded="false"
                      aria-required="true"
                      aria-label="State"
                      role="combobox"
                    >
                      <span
                        className="select2-selection__rendered"
                        aria-required="true"
                        id="select2-billing_state-container"
                        role="textbox"
                        aria-readonly="true"
                      >
                        <span className="select2-selection__placeholder">
                          Select an option…
                        </span>
                      </span>
                      <span
                        className="select2-selection__arrow"
                        role="presentation"
                      >
                        <b role="presentation"></b>
                      </span>
                    </span>
                  </span>
                  <span className="dropdown-wrapper" aria-hidden="true"></span>
                </span>
              </span>
            </p>
            <p
              className="form-row form-row-wide address-field validate-required validate-postcode"
              id="billing_postcode_field"
              data-priority="90"
            >
              <label htmlFor="billing_postcode" className="">
                ZIP Code&nbsp;
                <abbr className="required" title="required">
                  *
                </abbr>
              </label>
              <span className="woocommerce-input-wrapper">
                <input
                  type="text"
                  className="input-text"
                  name="billing_postcode"
                  id="billing_postcode"
                  placeholder=""
                  value=""
                  aria-required="true"
                />
              </span>
            </p>
          </div>

          <p>
            <button
              type="submit"
              className="button"
              name="save_address"
              value="Save address"
            >
              Save address
            </button>
            <input
              type="hidden"
              id="woocommerce-edit-address-nonce"
              name="woocommerce-edit-address-nonce"
              value="52e537e29c"
            />
            <input
              type="hidden"
              name="_wp_http_referer"
              value="/my-account/edit-address/billing/"
            />
            <input type="hidden" name="action" value="edit_address" />
          </p>
        </div>
      </form>
    </div>
  );
}
