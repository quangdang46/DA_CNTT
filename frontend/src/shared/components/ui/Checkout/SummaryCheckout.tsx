"use client";
import locationApiRequest from "@/shared/apiRequests/locationApi";
import CheckoutItem from "@/shared/components/ui/Checkout/CheckoutItem";
import CheckoutShip from "@/shared/components/ui/Checkout/CheckoutShip";
import Payment from "@/shared/components/ui/Checkout/Payment";
import { useCheckout } from "@/shared/contexts/CheckoutContext";
import { useCart } from "@/shared/hooks/useCart";
import React from "react";

export default function SummaryCheckout() {
  const { cartItems, totalPrice } = useCart();
  const { discountAmount } = useCheckout();
  const { data } = locationApiRequest.useGetAddress();
  const initAddress = data?.data;
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
              <CheckoutShip address={initAddress || []}></CheckoutShip>

              <tr className="cart-subtotal">
                <th>Subtotal</th>
                <td data-title="Subtotal">
                  <span className="woocommerce-Price-amount amount">
                    <bdi>
                      <span className="woocommerce-Price-currencySymbol"></span>
                      {totalPrice.toFixed(0)}
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
                          <span className="woocommerce-Price-currencySymbol"></span>
                          {discountAmount.toFixed(0)}
                        </bdi>
                      </span>
                    </td>
                  </>
                )}
              </tr>
              <tr className="order-total">
                <th>Total</th>
                <td data-title="Subtotal">
                  <span className="woocommerce-Price-amount amount">
                    <bdi>
                      <span className="woocommerce-Price-currencySymbol"></span>
                      {Math.max(totalPrice - discountAmount, 0).toFixed(0)}
                    </bdi>
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
          <Payment></Payment>
        </div>
      </div>
    </>
  );
}
