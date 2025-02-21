import { Product } from "@/shared/types/ProductTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface Props {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToCompare?: (product: Product) => void;
}
export default function ProductGrid({
  product,
  onAddToCompare = () => {},
  onAddToCart = () => {},
}: Props) {
  return (
    <div className="product">
      <div className="yith-wcwl-add-to-wishlist">
        <a href="wishlist.html" rel="nofollow" className="add_to_wishlist">
          {" "}
          Add to Wishlist
        </a>
      </div>
      <Link
        className="woocommerce-LoopProduct-link woocommerce-loop-product__link"
        href={`/details/${product.slug}`}
      >
        <Image
          width={224}
          height={197}
          alt={product.name}
          className="attachment-shop_catalog size-shop_catalog wp-post-image"
          src={product.images[0].image_url}
        />
        <span className="price">
          <span className="woocommerce-Price-amount amount">
            {Math.round(product.price)}
            <span className="woocommerce-Price-currencySymbol">VNĐ</span>
          </span>
        </span>
        <h2 className="woocommerce-loop-product__title">{product.name}</h2>
      </Link>
      {/* .woocommerce-LoopProduct-link */}
      <div className="hover-area">
        <button className="button" onClick={() => onAddToCart(product)}>
          Add to cart
        </button>
        <button
          className="add-to-compare-link"
          onClick={() => onAddToCompare(product)}
        >
          Add to compare
        </button>
      </div>
      {/* .hover-area */}
    </div>
  );
}
