import { Product } from "@/shared/types/ProductTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface Props {
  product: Product;
  onRemove: (id: string) => void;
}
export default function ProductRow({ product, onRemove }: Props) {
  return (
    <tr>
      <td className="product-remove">
        <div>
          <div
            title="Remove this product"
            className="remove remove_from_wishlist"
            onClick={() => onRemove(product.id)}
>
            ×
          </div>
        </div>
      </td>
      <td className="product-thumbnail">
        <Link href={`/details/${product.slug}`}>
          <Image
            width={180}
            height={180}
            alt={product.name}
            className="wp-post-image"
            src={product.images[0].image_url}
          />
        </Link>
      </td>
      <td className="product-name">
        <Link href={`/details/${product.slug}`}>{product.name}</Link>
      </td>
      <td className="product-price">
        <ins>
          <span className="woocommerce-Price-amount amount">
            <span className="woocommerce-Price-currencySymbol">£</span>
            {product.price}
          </span>
        </ins>
        <del>
          <span className="woocommerce-Price-amount amount">
            <span className="woocommerce-Price-currencySymbol">£</span>
            {product.price * 0.8}
          </span>
        </del>
      </td>
      <td className="product-stock-status">
        <span className="wishlist-in-stock">{product.status}</span>
      </td>
      <td className="product-add-to-cart">
        <a className="button add_to_cart_button button alt" href="cart.html">
          Add to Cart
        </a>
      </td>
    </tr>
  );
}
