import WrapperContent from "@/shared/components/layouts/WrapperContent";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <WrapperContent>
      {/* empty */}
      <div id="post-5" className="post-5 page type-page status-publish hentry">
        <div className="entry-content">
          {/* <div className="woocommerce">
            <div className="woocommerce-notices-wrapper">
              <div className="woocommerce-message" role="alert" tabIndex={-1}>
                “Smart Watches 3 SWR50” removed.{" "}
                <a
                  href="https://techmarket.madrasthemes.com/cart/?undo_item=45c48cce2e2d7fbdea1afc51c7c6ad26&_wpnonce=528b4262a8"
                  className="restore-item"
                >
                  Undo?
                </a>{" "}
              </div>
            </div>
            <div className="wc-empty-cart-message">
              <div className="cart-empty woocommerce-info">
                Your cart is currently empty.{" "}
              </div>
            </div>{" "}
            <p className="return-to-shop">
              <a
                className="button wc-backward"
                href="https://techmarket.madrasthemes.com/shop/"
              >
                Return to shop{" "}
              </a>
            </p>
          </div> */}

          <div className="woocommerce">
            <div className="woocommerce-notices-wrapper">
              <div className="woocommerce-message" role="alert">
                Cart updated.{" "}
              </div>
            </div>
            <div className="cart-wrapper">
              <form
                className="woocommerce-cart-form"
                action="https://techmarket.madrasthemes.com/cart/"
                method="post"
              >
                <table
                  className="shop_table shop_table_responsive cart woocommerce-cart-form__contents"
                  cellSpacing={0}
                >
                  <thead>
                    <tr>
                      <th className="product-remove">
                        <span className="screen-reader-text">Remove item</span>
                      </th>
                      <th className="product-thumbnail">
                        <span className="screen-reader-text">
                          Thumbnail image
                        </span>
                      </th>
                      <th className="product-name">Product</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-subtotal">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="woocommerce-cart-form__cart-item cart_item">
                      <td className="product-remove">
                        <Link
                          href="/"
                          className="remove"
                          aria-label="Remove Smart Watches 3 SWR50 from cart"
                          data-product_id={9}
                          data-product_sku=""
                        >
                          ×
                        </Link>{" "}
                      </td>
                      <td className="product-thumbnail">
                        <a href="https://techmarket.madrasthemes.com/product/smart-watches-3-swr50/">
                          <Image
                            decoding="async"
                            width={224}
                            height={197}
                            src="https://plus.unsplash.com/premium_photo-1734713078804-818d9e818c9c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                            alt=""
                          />
                        </a>{" "}
                      </td>
                      <td className="product-name" data-title="Product">
                        <div className="media cart-item-product-detail">
                          <a href="https://techmarket.madrasthemes.com/product/smart-watches-3-swr50/">
                            <Image
                              decoding="async"
                              width={224}
                              height={197}
                              src="https://plus.unsplash.com/premium_photo-1734713078804-818d9e818c9c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                              className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                              alt=""
                            />
                          </a>
                          <div className="media-body align-self-center">
                            <a href="https://techmarket.madrasthemes.com/product/smart-watches-3-swr50/">
                              Smart Watches 3 SWR50
                            </a>
                          </div>
                        </div>{" "}
                      </td>
                      <td className="product-price" data-title="Price">
                        <span className="woocommerce-Price-amount amount">
                          <bdi>
                            <span className="woocommerce-Price-currencySymbol">
                              $
                            </span>
                            309.95
                          </bdi>
                        </span>{" "}
                      </td>
                      <td className="product-quantity" data-title="Quantity">
                        <div className="quantity buttons_added">
                          <input
                            type="button"
                            defaultValue="-"
                            className="minus"
                          />
                          <label htmlFor="quantity-input">Quantity</label>
                          <input
                            id="quantity-input"
                            type="number"
                            step={1}
                            min={0}
                            max=""
                            name="cart[45c48cce2e2d7fbdea1afc51c7c6ad26][qty]"
                            defaultValue={3}
                            title="Qty"
                            className="input-text qty text"
                            size={4}
                            pattern="[0-9]*"
                            inputMode="numeric"
                          />
                          <input
                            type="button"
                            defaultValue="+"
                            className="plus"
                          />
                        </div>
                      </td>
                      <td className="product-subtotal" data-title="Subtotal">
                        <span className="woocommerce-Price-amount amount">
                          <bdi>
                            <span className="woocommerce-Price-currencySymbol">
                              $
                            </span>
                            929.85
                          </bdi>
                        </span>{" "}
                        <Link
                          href="/"
                          className="remove"
                          title="Remove this item"
                          data-product_id={9}
                          data-product_sku=""
                        >
                          ×
                        </Link>{" "}
                      </td>
                    </tr>
                    <tr className="woocommerce-cart-form__cart-item cart_item">
                      <td className="product-remove">
                        <a
                          href="https://techmarket.madrasthemes.com/cart/?remove_item=f4b9ec30ad9f68f89b29639786cb62ef&_wpnonce=528b4262a8"
                          className="remove"
                          aria-label="Remove On-ear Wireless NXTG from cart"
                          data-product_id={94}
                          data-product_sku=""
                        >
                          ×
                        </a>{" "}
                      </td>
                      <td className="product-thumbnail">
                        <a href="https://techmarket.madrasthemes.com/product/on-ear-wireless-nxtg/">
                          <Image
                            decoding="async"
                            width={224}
                            height={197}
                            src="https://plus.unsplash.com/premium_photo-1734713078804-818d9e818c9c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                            alt=""
                          />
                        </a>{" "}
                      </td>
                      <td className="product-name" data-title="Product">
                        <div className="media cart-item-product-detail">
                          <a href="https://techmarket.madrasthemes.com/product/on-ear-wireless-nxtg/">
                            <Image
                              decoding="async"
                              width={224}
                              height={197}
                              src="https://plus.unsplash.com/premium_photo-1734713078804-818d9e818c9c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                              className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                              alt=""
                            />
                          </a>
                          <div className="media-body align-self-center">
                            <a href="https://techmarket.madrasthemes.com/product/on-ear-wireless-nxtg/">
                              On-ear Wireless NXTG
                            </a>
                          </div>
                        </div>{" "}
                      </td>
                      <td className="product-price" data-title="Price">
                        <span className="woocommerce-Price-amount amount">
                          <bdi>
                            <span className="woocommerce-Price-currencySymbol">
                              $
                            </span>
                            249.95
                          </bdi>
                        </span>{" "}
                      </td>
                      <td className="product-quantity" data-title="Quantity">
                        <div className="quantity buttons_added">
                          <input
                            type="button"
                            defaultValue="-"
                            className="minus"
                          />
                          <label htmlFor="quantity-input">Quantity</label>
                          <input
                            id="quantity-input"
                            type="number"
                            step={1}
                            min={0}
                            max=""
                            name="cart[f4b9ec30ad9f68f89b29639786cb62ef][qty]"
                            defaultValue={1}
                            title="Qty"
                            className="input-text qty text"
                            size={4}
                            pattern="[0-9]*"
                            inputMode="numeric"
                          />
                          <input
                            type="button"
                            defaultValue="+"
                            className="plus"
                          />
                        </div>
                      </td>
                      <td className="product-subtotal" data-title="Subtotal">
                        <span className="woocommerce-Price-amount amount">
                          <bdi>
                            <span className="woocommerce-Price-currencySymbol">
                              $
                            </span>
                            249.95
                          </bdi>
                        </span>{" "}
                        <a
                          href="https://techmarket.madrasthemes.com/cart/?remove_item=f4b9ec30ad9f68f89b29639786cb62ef&_wpnonce=528b4262a8"
                          className="remove"
                          title="Remove this item"
                          data-product_id={94}
                          data-product_sku=""
                        >
                          ×
                        </a>{" "}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={6} className="actions">
                        <div className="coupon">
                          <label
                            htmlFor="coupon_code"
                            className="screen-reader-text"
                          >
                            Coupon:
                          </label>{" "}
                          <input
                            type="text"
                            name="coupon_code"
                            className="input-text"
                            id="coupon_code"
                            defaultValue=""
                            placeholder="Coupon code"
                          />{" "}
                          <button
                            type="submit"
                            className="button"
                            name="apply_coupon"
                            value="Apply coupon"
                          >
                            Apply coupon
                          </button>
                        </div>
                        <button
                          type="submit"
                          className="button"
                          name="update_cart"
                          value="Update cart"
                        >
                          Update cart
                        </button>
                        <input
                          type="hidden"
                          id="woocommerce-cart-nonce"
                          name="woocommerce-cart-nonce"
                          defaultValue="528b4262a8"
                        />
                        <input
                          type="hidden"
                          name="_wp_http_referer"
                          defaultValue="/cart/"
                        />{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
              <div className="cart-collaterals">
                <div className="cart_totals">
                  <h2>Cart totals</h2>
                  <table
                    cellSpacing={0}
                    className="shop_table shop_table_responsive"
                  >
                    <tbody>
                      <tr className="cart-subtotal">
                        <th>Subtotal</th>
                        <td data-title="Subtotal">
                          <span className="woocommerce-Price-amount amount">
                            <bdi>
                              <span className="woocommerce-Price-currencySymbol">
                                $
                              </span>
                              1,179.80
                            </bdi>
                          </span>
                        </td>
                      </tr>
                      <tr className="woocommerce-shipping-totals shipping">
                        <th>Shipping</th>
                        <td data-title="Shipping">
                          <ul
                            id="shipping_method"
                            className="woocommerce-shipping-methods"
                          >
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
                                    <span className="woocommerce-Price-currencySymbol">
                                      $
                                    </span>
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
                                    <span className="woocommerce-Price-currencySymbol">
                                      $
                                    </span>
                                    500.00
                                  </bdi>
                                </span>
                              </label>{" "}
                            </li>
                          </ul>
                          <p className="woocommerce-shipping-destination">
                            Shipping to <strong>Vietnam</strong>.{" "}
                          </p>
                          <form
                            className="woocommerce-shipping-calculator"
                            action="https://techmarket.madrasthemes.com/cart/"
                            method="post"
                          >
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
                                  <option value="default">
                                    Select a country / region…
                                  </option>
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
                                <button
                                  type="submit"
                                  name="calc_shipping"
                                  value={1}
                                  className="button"
                                >
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
                      <tr className="order-total">
                        <th>Total</th>
                        <td data-title="Total">
                          <strong>
                            <span className="woocommerce-Price-amount amount">
                              <bdi>
                                <span className="woocommerce-Price-currencySymbol">
                                  $
                                </span>
                                1,279.80
                              </bdi>
                            </span>
                          </strong>{" "}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="wc-proceed-to-checkout">
                    <form
                      className="woocommerce-shipping-calculator"
                      action="https://techmarket.madrasthemes.com/cart/"
                      method="post"
                    >
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
                            <option value="default">
                              Select a country / region…
                            </option>
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
                          <button
                            type="submit"
                            name="calc_shipping"
                            value={1}
                            className="button"
                          >
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
            </div>
          </div>
        </div>
      </div>
    </WrapperContent>
  );
}
