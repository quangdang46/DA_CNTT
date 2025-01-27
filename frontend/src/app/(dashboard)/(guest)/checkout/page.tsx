import WrapperContent from '@/shared/components/layouts/WrapperContent'
import React from 'react'

export default function page() {
  return (
    <WrapperContent>
      <div className="type-page hentry">
        <div className="entry-content">
          <div className="woocommerce">
            <div className="woocommerce-info">
              Returning customer?
              <a
                data-toggle="collapse"
                href="#login-form"
                aria-expanded="false"
                aria-controls="login-form"
                className="showlogin"
              >
                Click here to login
              </a>
            </div>
            <div className="collapse" id="login-form">
              <form
                method="post"
                className="woocomerce-form woocommerce-form-login login"
              >
                <p className="before-login-text">
                  Vestibulum lacus magna, faucibus vitae dui eget, aliquam
                  fringilla. In et commodo elit. Class aptent taciti sociosqu ad
                  litora.
                </p>
                <p>
                  If you have shopped with us before, please enter your details
                  in the boxes below. If you are a new customer, please proceed
                  to the Billing &amp; Shipping section.
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
                  <label className="woocommerce-form__label woocommerce-form__label-for-checkbox inline">
                    <input
                      type="checkbox"
                      defaultValue="forever"
                      id="rememberme"
                      name="rememberme"
                      className="woocommerce-form__input woocommerce-form__input-checkbox"
                    />
                    <span>Remember me</span>
                  </label>
                </p>
                <p className="lost_password">
                  <a href="#">Lost your password?</a>
                </p>
                <div className="clear" />
              </form>
            </div>
            {/* .collapse */}
            <div className="woocommerce-info">
              Have a coupon?
              <a
                data-toggle="collapse"
                href="#checkoutCouponForm"
                aria-expanded="false"
                aria-controls="checkoutCouponForm"
                className="showlogin"
              >
                Click here to enter your code
              </a>
            </div>
            <div className="collapse" id="checkoutCouponForm">
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
            {/* .collapse */}
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
                          className="form-row form-row-first validate-required woocommerce-invalid woocommerce-invalid-required-field"
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
                          id="billing_last_name_field"
                          className="form-row form-row-last validate-required"
                        >
                          <label className="" htmlFor="billing_last_name">
                            Last Name
                            <abbr title="required" className="required">
                              *
                            </abbr>
                          </label>
                          <input
                            type="text"
                            defaultValue=""
                            placeholder=""
                            id="billing_last_name"
                            name="billing_last_name"
                            className="input-text"
                          />
                        </p>
                        <div className="clear" />
                        <p
                          id="billing_company_field"
                          className="form-row form-row-wide"
                        >
                          <label className="" htmlFor="billing_company">
                            Company Name
                          </label>
                          <input
                            type="text"
                            defaultValue=""
                            placeholder=""
                            id="billing_company"
                            name="billing_company"
                            className="input-text"
                          />
                        </p>
                        <p
                          id="billing_country_field"
                          className="form-row form-row-wide validate-required validate-email"
                        >
                          <label className="" htmlFor="billing_country">
                            Country
                            <abbr title="required" className="required">
                              *
                            </abbr>
                          </label>
                          <select
                            autoComplete="country"
                            className="country_to_state country_select select2-hidden-accessible"
                            id="billing_country"
                            name="billing_country"
                            tabIndex={-1}
                            aria-hidden="true"
                          >
                            <option value="">Select a country…</option>
                          </select>
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
                        <p
                          id="billing_address_2_field"
                          className="form-row form-row-wide address-field"
                        >
                          <input
                            type="text"
                            defaultValue=""
                            placeholder="Apartment, suite, unit etc. (optional)"
                            id="billing_address_2"
                            name="billing_address_2"
                            className="input-text"
                          />
                        </p>
                        <p
                          id="billing_city_field"
                          className="form-row form-row-wide address-field validate-required"
                          data-o_class="form-row form-row form-row-wide address-field validate-required"
                        >
                          <label className="" htmlFor="billing_city">
                            Town / City
                            <abbr title="required" className="required">
                              *
                            </abbr>
                          </label>
                          <input
                            type="text"
                            defaultValue=""
                            placeholder=""
                            id="billing_city"
                            name="billing_city"
                            className="input-text"
                          />
                        </p>
                        <p
                          id="billing_state_field"
                          className="form-row form-row-wide validate-required validate-email"
                        >
                          <label className="" htmlFor="billing_state">
                            State / County
                            <abbr title="required" className="required">
                              *
                            </abbr>
                          </label>
                          <select
                            data-placeholder=""
                            autoComplete="address-level1"
                            className="state_select select2-hidden-accessible"
                            id="billing_state"
                            name="billing_state"
                            tabIndex={-1}
                            aria-hidden="true"
                          >
                            <option value="">Select an option…</option>
                          
                          </select>
                        </p>
                        <p
                          id="billing_postcode_field"
                          className="form-row form-row-wide address-field validate-postcode validate-required"
                          data-o_class="form-row form-row form-row-last address-field validate-required validate-postcode"
                        >
                          <label className="" htmlFor="billing_postcode">
                            Postcode / ZIP
                            <abbr title="required" className="required">
                              *
                            </abbr>
                          </label>
                          <input
                            type="text"
                            defaultValue=""
                            placeholder=""
                            id="billing_postcode"
                            name="billing_postcode"
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
                      </div>
                    </div>
                    {/* .woocommerce-billing-fields__field-wrapper-outer */}
                  </div>
                  {/* .woocommerce-billing-fields */}
                  <div className="woocommerce-account-fields">
                    <p className="form-row form-row-wide woocommerce-validated">
                      <label
                        className="collapsed woocommerce-form__label woocommerce-form__label-for-checkbox checkbox"
                        data-toggle="collapse"
                        data-target="#createLogin"
                        aria-controls="createLogin"
                      >
                        <input
                          type="checkbox"
                          defaultValue={1}
                          name="createaccount"
                          className="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox"
                        />
                        <span>Create an account?</span>
                      </label>
                    </p>
                    <div className="create-account collapse" id="createLogin">
                      <p
                        data-priority=""
                        id="account_password_field"
                        className="form-row validate-required woocommerce-invalid woocommerce-invalid-required-field"
                      >
                        <label className="" htmlFor="account_password">
                          Account password
                          <abbr title="required" className="required">
                            *
                          </abbr>
                        </label>
                        <input
                          type="password"
                          defaultValue=""
                          placeholder="Password"
                          id="account_password"
                          name="account_password"
                          className="input-text"
                        />
                      </p>
                      <div className="clear" />
                    </div>
                  </div>
                  {/* .woocommerce-account-fields */}
                </div>
                {/* .col-1 */}
                <div className="col-2">
                  <div className="woocommerce-shipping-fields">
                    <h3 id="ship-to-different-address">
                      <label
                        className="collapsed woocommerce-form__label woocommerce-form__label-for-checkbox checkbox"
                        data-toggle="collapse"
                        data-target="#shipping-address"
                        aria-controls="shipping-address"
                      >
                        <input
                          id="ship-to-different-address-checkbox"
                          className="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox"
                          type="checkbox"
                          defaultValue={1}
                          name="ship_to_different_address"
                        />
                        <span>Ship to a different address?</span>
                      </label>
                    </h3>
                    <div
                      className="shipping_address collapse"
                      id="shipping-address"
                    >
                      <div className="woocommerce-shipping-fields__field-wrapper">
                        <p
                          id="shipping_first_name_field"
                          className="form-row form-row-first validate-required"
                        >
                          <label className="" htmlFor="shipping_first_name">
                            First name
                            <abbr title="required" className="required">
                              *
                            </abbr>
                          </label>
                          <input
                            type="text"
                            autoComplete="given-name"
                            defaultValue=""
                            placeholder=""
                            id="shipping_first_name"
                            name="shipping_first_name"
                            className="input-text"
                          />
                        </p>
                        <p
                          id="shipping_last_name_field"
                          className="form-row form-row-last validate-required"
                        >
                          <label className="" htmlFor="shipping_last_name">
                            Last name
                            <abbr title="required" className="required">
                              *
                            </abbr>
                          </label>
                          <input
                            type="text"
                            autoComplete="family-name"
                            defaultValue=""
                            placeholder=""
                            id="shipping_last_name"
                            name="shipping_last_name"
                            className="input-text"
                          />
                        </p>
                        <p
                          id="shipping_company_field"
                          className="form-row form-row-wide"
                        >
                          <label className="" htmlFor="shipping_company">
                            Company name
                          </label>
                          <input
                            type="text"
                            autoComplete="organization"
                            defaultValue=""
                            placeholder=""
                            id="shipping_company"
                            name="shipping_company"
                            className="input-text"
                          />
                        </p>
                        <p
                          id="shipping_country_field"
                          className="form-row form-row-wide address-field update_totals_on_change validate-required woocommerce-validated"
                        >
                          <label className="" htmlFor="shipping_country">
                            Country
                            <abbr title="required" className="required">
                              *
                            </abbr>
                          </label>
                          <select
                            autoComplete="country"
                            className="country_to_state country_select select2-hidden-accessible"
                            id="shipping_country"
                            name="shipping_country"
                            tabIndex={-1}
                            aria-hidden="true"
                          >
                            <option value="">Select a country…</option>
                           
                          </select>
                        </p>
                        <p
                          id="shipping_address_1_field"
                          className="form-row form-row-wide address-field validate-required"
                        >
                          <label className="" htmlFor="shipping_address_1">
                            Street address
                            <abbr title="required" className="required">
                              *
                            </abbr>
                          </label>
                          <input
                            type="text"
                            autoComplete="address-line1"
                            defaultValue=""
                            placeholder="House number and street name"
                            id="shipping_address_1"
                            name="shipping_address_1"
                            className="input-text"
                          />
                        </p>
                        <p
                          id="shipping_address_2_field"
                          className="form-row form-row-wide address-field"
                        >
                          <input
                            type="text"
                            autoComplete="address-line2"
                            defaultValue=""
                            placeholder="Apartment, suite, unit etc. (optional)"
                            id="shipping_address_2"
                            name="shipping_address_2"
                            className="input-text"
                          />
                        </p>
                        <p
                          id="shipping_city_field"
                          className="form-row form-row-wide address-field validate-required"
                          data-o_class="form-row form-row-wide address-field validate-required"
                        >
                          <label className="" htmlFor="shipping_city">
                            Town / City
                            <abbr title="required" className="required">
                              *
                            </abbr>
                          </label>
                          <input
                            type="text"
                            autoComplete="address-level2"
                            defaultValue=""
                            placeholder=""
                            id="shipping_city"
                            name="shipping_city"
                            className="input-text"
                          />
                        </p>
                        <p
                          id="shipping_state_field"
                          className="form-row form-row-wide address-field validate-state woocommerce-invalid woocommerce-invalid-required-field validate-required"
                        >
                          <label className="" htmlFor="shipping_state">
                            State / County
                            <abbr title="required" className="required">
                              *
                            </abbr>
                          </label>
                          <select
                            data-placeholder=""
                            autoComplete="address-level1"
                            className="state_select select2-hidden-accessible"
                            id="shipping_state"
                            name="shipping_state"
                            tabIndex={-1}
                            aria-hidden="true"
                          >
                            <option value="">Select an option…</option>
                            <option value="AP">Andhra Pradesh</option>
                            
                          </select>
                        </p>
                        <p
                          data-priority={90}
                          id="shipping_postcode_field"
                          className="form-row form-row-wide address-field validate-postcode validate-required"
                          data-o_class="form-row form-row-wide address-field validate-required validate-postcode"
                        >
                          <label className="" htmlFor="shipping_postcode">
                            Postcode / ZIP
                            <abbr title="required" className="required">
                              *
                            </abbr>
                          </label>
                          <input
                            type="text"
                            autoComplete="postal-code"
                            defaultValue=""
                            placeholder=""
                            id="shipping_postcode"
                            name="shipping_postcode"
                            className="input-text"
                          />
                        </p>
                      </div>
                      {/* .woocommerce-shipping-fields__field-wrapper */}
                    </div>
                    {/* .shipping_address */}
                  </div>
                  {/* .woocommerce-shipping-fields */}
                  <div className="woocommerce-additional-fields">
                    <div className="woocommerce-additional-fields__field-wrapper">
                      <p id="order_comments_field" className="form-row notes">
                        <label className="" htmlFor="order_comments">
                          Order notes
                        </label>
                        <textarea
                          cols={5}
                          rows={2}
                          placeholder="Notes about your order, e.g. special notes for delivery."
                          id="order_comments"
                          className="input-text"
                          name="order_comments"
                          defaultValue={""}
                        />
                      </p>
                    </div>
                    {/* .woocommerce-additional-fields__field-wrapper*/}
                  </div>
                  {/* .woocommerce-additional-fields */}
                </div>
                {/* .col-2 */}
              </div>
              {/* .col2-set */}
              <h3 id="order_review_heading">Your order</h3>
              <div
                className="woocommerce-checkout-review-order"
                id="order_review"
              >
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
                          KU6470 6 Series UHD Crystal Colour HDR Smart
                          TV&nbsp;
                        </td>
                        <td className="product-total">
                          <span className="woocommerce-Price-amount amount">
                            <span className="woocommerce-Price-currencySymbol">
                              £
                            </span>
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
                            <span className="woocommerce-Price-currencySymbol">
                              £
                            </span>
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
                            <span className="woocommerce-Price-currencySymbol">
                              £
                            </span>
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
                            <span className="woocommerce-Price-currencySymbol">
                              £
                            </span>
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
                            <span className="woocommerce-Price-currencySymbol">
                              £
                            </span>
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
                        <label htmlFor="payment_method_cheque">
                          Check payments
                        </label>
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
                        <label htmlFor="payment_method_cod">
                          Cash on delivery
                        </label>
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
                        <input
                          type="hidden"
                          defaultValue={1}
                          name="terms-field"
                        />
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
            {/* .woocommerce-checkout */}
          </div>
          {/* .woocommerce */}
        </div>
        {/* .entry-content */}
      </div>
    </WrapperContent>
  );
}
