import { CartItem } from "@/shared/types/CartTypes";
import React from "react";
interface Props {
  item: CartItem;
}
export default function CheckoutItem({ item }: Props) {
  return (
    <tr className="cart_item">
      <td className="product-name">
        <strong className="product-quantity">{item.quantity} ×</strong>
        {item.product.name}
      </td>
      <td className="product-total">
        <span className="woocommerce-Price-amount amount">
          <span className="woocommerce-Price-currencySymbol">VNĐ</span>
          {item.product.price * item.quantity}
        </span>
      </td>
    </tr>
  );
}
