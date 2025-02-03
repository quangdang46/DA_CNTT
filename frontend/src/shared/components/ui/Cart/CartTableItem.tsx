/* eslint-disable @typescript-eslint/no-explicit-any */
import { CartItem } from "@/shared/types/CartTypes";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface Props {
  item: CartItem;
  handleQuantity: (e: any, productId: string, action: string) => void;
  handleRemoveFromCart: (productId: string) => void;
}
export default function CartTableItem({
  item,
  handleQuantity,
  handleRemoveFromCart,
}: Props) {
  return (
    <tr className="woocommerce-cart-form__cart-item cart_item">
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
            <span className="woocommerce-Price-currencySymbol">$</span>
            {item.product.price}
          </bdi>
        </span>
      </td>
      <td className="product-quantity" data-title="Quantity">
        <div className="quantity buttons_added">
          <input
            type="button"
            defaultValue="-"
            className="minus"
            onClick={() => handleQuantity(null, item.product_id, "decrease")}
          />
          <label htmlFor={`quantity-input-${item.id}`}>Quantity</label>
          <input
            id={`quantity-input-${item.id}`}
            type="number"
            step={1}
            min={0}
            max=""
            name={`cart[${item.id}][qty]`}
            value={item.quantity}
            onChange={(e) => handleQuantity(e, item.product_id, "input")}
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
            onClick={() => handleQuantity(null, item.product_id, "increase")}
          />
        </div>
      </td>
      <td className="product-subtotal" data-title="Subtotal">
        <span className="woocommerce-Price-amount amount">
          <bdi>
            <span className="woocommerce-Price-currencySymbol">$</span>
            {item.product.price * item.quantity}
          </bdi>
        </span>
        <div
          onClick={() => handleRemoveFromCart(item.product_id)}
          className="remove"
          title="Remove this item"
        >
          <X />
        </div>
      </td>
    </tr>
  );
}
