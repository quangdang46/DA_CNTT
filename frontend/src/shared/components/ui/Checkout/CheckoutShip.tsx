"use client";

import locationApiRequest from "@/shared/apiRequests/locationApi";
import {
  setSelectedShippingFee,
  setShippingFees,
} from "@/shared/state/cartSlice";
import { RootState } from "@/shared/state/store";
import { DeliveryType } from "@/shared/types/CartTypes";
import { Address } from "@/shared/types/LocationTypes";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
interface Props {
  address: Address[] | null;
}
export default function CheckoutShip({ address }: Props) {
  const dispatch = useDispatch();
  const selectedDelivery = useSelector(
    (state: RootState) => state.cart.selectedShippingFee
  );

  const defaultAddress = address?.find(
    (item: Address) => item.is_default === 1
  );

  const { data: shippingFee } = locationApiRequest.useShippingFee(
    defaultAddress as Address
  );

  useEffect(() => {
    if (shippingFee) {
      dispatch(
        setShippingFees({
          normal: shippingFee?.normal?.fee || 0,
          express: shippingFee?.express?.fee || 0,
          free: 0, // Mặc định free khi chưa chọn địa chỉ
        })
      );
    }
  }, [shippingFee, dispatch]);

  const handleDeliveryChange = (deliveryType: DeliveryType) => {
    dispatch(setSelectedShippingFee(deliveryType));
  };
  return (
    <tr className="woocommerce-shipping-totals shipping">
      <th>Shipping</th>
      <td data-title="Shipping">
        <ul id="shipping_method" className="woocommerce-shipping-methods">
          <li>
            <input
              type="radio"
              name="shipping_method[0]"
              data-index="0"
              id="shipping_method_0_flat_rate1"
              className="shipping_method"
              value={DeliveryType.Normal}
              checked={selectedDelivery === DeliveryType.Normal}
              onChange={() => handleDeliveryChange(DeliveryType.Normal)}
            />
            <label
              htmlFor="shipping_method_0_flat_rate1"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span style={{ textWrap: "nowrap", marginRight: "10px" }}>
                Normal Delivery:{" "}
              </span>
              <span className="woocommerce-Price-amount amount">
                <bdi>
                  <span className="woocommerce-Price-currencySymbol">VNĐ</span>
                  {shippingFee?.normal?.fee}
                </bdi>
              </span>
            </label>
          </li>
          <li>
            <input
              type="radio"
              name="shipping_method[0]"
              data-index="0"
              id="shipping_method_0_flat_rate2"
              className="shipping_method"
              value={DeliveryType.Express}
              checked={selectedDelivery === DeliveryType.Express}
              onChange={() => handleDeliveryChange(DeliveryType.Express)}
            />
            <label
              htmlFor="shipping_method_0_flat_rate2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span style={{ textWrap: "nowrap", marginRight: "10px" }}>
                Express Delivery:
              </span>
              <span className="woocommerce-Price-amount amount">
                <bdi>
                  <span className="woocommerce-Price-currencySymbol">VNĐ</span>
                  {shippingFee?.express?.fee}
                </bdi>
              </span>
            </label>
          </li>
        </ul>
      </td>
    </tr>
  );
}
