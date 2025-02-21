import { Product } from "@/shared/types/ProductTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface Props {
  product: Product;
  onRemove: (id: string) => void;
  onAddToCart?: (product: Product) => void;
}
export default function ProductRow({
  product,
  onRemove,
  onAddToCart = () => {},
}: Props) {
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
            {Math.round(product.price)}
            <span className="woocommerce-Price-currencySymbol">VNĐ</span>
          </span>
        </ins>
        <del>
          <span className="woocommerce-Price-amount amount">
            {Math.round(product.price * 2)}
            <span className="woocommerce-Price-currencySymbol">VNĐ </span>
          </span>
        </del>
      </td>
      <td className="product-stock-status">
        <span className="wishlist-in-stock">{product.status}</span>
      </td>
      <td className="product-add-to-cart">
        <button
          className="button add_to_cart_button button alt"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </td>
    </tr>
  );
}
