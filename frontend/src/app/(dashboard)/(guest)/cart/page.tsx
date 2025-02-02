/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import WrapperContent from "@/shared/components/layouts/WrapperContent";
import { useCart } from "@/shared/hooks/useCart";
import { Undo2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Swal from "sweetalert2";

export default function Page() {
  const { cartItems, handleRemoveFromCart, handleUpdateQuantity, totalPrice } =
    useCart();
  const handleQuantity = (e: any, productId: string, action: string) => {
    const currentItem = cartItems.find((item) => item.product_id === productId);
    if (!currentItem) return;

    let newQuantity = currentItem.quantity;

    if (action === "increase") {
      newQuantity += 1;
    } else if (action === "decrease") {
      newQuantity = Math.max(0, newQuantity - 1);
      if (newQuantity === 0) {
        Swal.fire({
          title: "Are you sure?",
          text: "You want to remove the item from cart",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, remove it!",
        }).then((result) => {
          if (result.isConfirmed) {
            handleRemoveFromCart(productId);
          }
        });
        return;
      }
    } else if (action === "input") {
      newQuantity = parseInt(e.target.value) || 0;
    }
    handleUpdateQuantity({
      product_id: productId,
      quantity: newQuantity,
    });
  };
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
             */}

          <div className="woocommerce">
            <div className="woocommerce-notices-wrapper">
              {/* <div className="woocommerce-message" role="alert">
                Cart updated.{" "}
              </div> */}
              {cartItems.length === 0 && (
                <>
                  <div className="wc-empty-cart-message">
                    <div className="cart-empty woocommerce-info">
                      Your cart is currently empty.
                    </div>
                  </div>
                  <p className="return-to-shop">
                    <Link className="button wc-backward" href="/shop">
                      <Undo2 /> Return to shop
                    </Link>
                  </p>
                </>
              )}
            </div>
            {cartItems.length > 0 && (
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
                        <th className="product-name">Product</th>
                        <th className="product-price">Price</th>
                        <th className="product-quantity">Quantity</th>
                        <th className="product-subtotal">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr
                          key={item.id}
                          className="woocommerce-cart-form__cart-item cart_item"
                        >
                          <td className="product-name" data-title="Product">
                            <div className="media cart-item-product-detail">
                              <Link href={`/details/${item.product.slug}`}>
                                <Image
                                  decoding="async"
                                  width={224}
                                  height={197}
                                  src={
                                    item.product.images[0].image_url ||
                                    "https://placehold.co/224x197"
                                  }
                                  className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                                  alt={item.product.name}
                                />
                              </Link>
                              <div className="media-body align-self-center">
                                <Link href={`/details/${item.product.slug}`}>
                                  {item.product.name}
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td className="product-price" data-title="Price">
                            <span className="woocommerce-Price-amount amount">
                              <bdi>
                                <span className="woocommerce-Price-currencySymbol">
                                  $
                                </span>
                                {item.product.price}
                              </bdi>
                            </span>
                          </td>
                          <td
                            className="product-quantity"
                            data-title="Quantity"
                          >
                            <div className="quantity buttons_added">
                              <input
                                type="button"
                                defaultValue="-"
                                className="minus"
                                onClick={() =>
                                  handleQuantity(
                                    null,
                                    item.product_id,
                                    "decrease"
                                  )
                                }
                              />
                              <label htmlFor={`quantity-input-${item.id}`}>
                                Quantity
                              </label>
                              <input
                                id={`quantity-input-${item.id}`}
                                type="number"
                                step={1}
                                min={0}
                                max=""
                                name={`cart[${item.id}][qty]`}
                                value={item.quantity}
                                onChange={(e) =>
                                  handleQuantity(e, item.product_id, "input")
                                }
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
                                onClick={() =>
                                  handleQuantity(
                                    null,
                                    item.product_id,
                                    "increase"
                                  )
                                }
                              />
                            </div>
                          </td>
                          <td
                            className="product-subtotal"
                            data-title="Subtotal"
                          >
                            <span className="woocommerce-Price-amount amount">
                              <bdi>
                                <span className="woocommerce-Price-currencySymbol">
                                  $
                                </span>
                                {item.product.price * item.quantity}
                              </bdi>
                            </span>
                            <div
                              onClick={() =>
                                handleRemoveFromCart(item.product_id)
                              }
                              className="remove"
                              title="Remove this item"
                            >
                              <X />
                            </div>
                          </td>
                        </tr>
                      ))}

                      {/* coupon */}
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
                                {totalPrice}
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
                              <a
                                href="#"
                                className="shipping-calculator-button"
                              >
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
            )}
          </div>
        </div>
      </div>
    </WrapperContent>
  );
}
