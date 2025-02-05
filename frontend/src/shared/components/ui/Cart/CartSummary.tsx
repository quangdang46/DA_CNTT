"use client";
import locationApiRequest from "@/shared/apiRequests/locationApi";
import AddressModal from "@/shared/components/ui/Account/AddressForm/AddressModal";
import ShippingForm from "@/shared/components/ui/Cart/ShippingForm";
import { selectTotalPrice } from "@/shared/state/cartSlice";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
interface Props {
  discountAmount: number;
}
export default function CartSummary({ discountAmount }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = locationApiRequest.useGetAddress();
  const initAddress = data?.data;
  const openModal = () => setIsModalOpen(true);
  const totalPrice = useSelector(selectTotalPrice);
  return (
    <>
      <AddressModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></AddressModal>
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
                      <span className="woocommerce-Price-currencySymbol">
                        $
                      </span>
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
              <ShippingForm address={initAddress || null}></ShippingForm>
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
              <div
                style={{ cursor: "pointer", marginBottom: "10px" }}
                className="shipping-calculator-button"
                onClick={openModal}
              >
                Select Address
                <p>
                  <strong>
                    If address not found, click here to add address and select
                    default
                  </strong>
                </p>
              </div>
            </form>
            <Link
              href="/checkout"
              className="checkout-button button alt wc-forward"
            >
              Proceed to checkout
            </Link>
            <Link href="/shop/" className="back-to-shopping">
              Back to Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
