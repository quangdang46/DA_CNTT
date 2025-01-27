
import { Product } from "@/shared/types/ProductTypes";
import { Star, StarHalf } from "lucide-react";
import Image from "next/image";
import React from "react";
interface Props {
  product: Product;
}
export default function ProductExtended({ product }: Props) {
  return (
    <div className="product">
      <div className="yith-wcwl-add-to-wishlist">
        <a href="wishlist.html" rel="nofollow" className="add_to_wishlist">
          {" "}
          Add to Wishlist
        </a>
      </div>
      <a
        className="woocommerce-LoopProduct-link woocommerce-loop-product__link"
        href="single-product-fullwidth.html"
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
            <span className="woocommerce-Price-currencySymbol">$</span>
            {product.price}
          </span>
        </span>
        <h2 className="woocommerce-loop-product__title">{product.name}</h2>
      </a>
      <div className="techmarket-product-rating">
        {Array(Math.floor(product.rating))
          .fill(0)
          .map((_, i) => (
            <Star strokeWidth={1} key={`full-${i}`} />
          ))}

        {product.rating % 1 !== 0 && (
          <StarHalf strokeWidth={1} key="half-star" />
        )}
        <span className="review-count">({product.review_count})</span>
      </div>
      <span className="sku_wrapper">
        SKU:
        <span className="sku">5487FB8/13</span>
      </span>
      <div className="woocommerce-product-details__short-description">
        <ul>
          {product.attributes && product.attributes.length > 0 ? (
            Object.entries(product.attributes[0]).map(([atr, value], index) => (
              <li key={index}>{value}</li>
            ))
          ) : (
            <div>No attributes available</div>
          )}
        </ul>
      </div>
      <a
        className="button product_type_simple add_to_cart_button"
        href="cart.html"
      >
        Add to cart
      </a>
      <a className="add-to-compare-link" href="compare.html">
        Add to compare
      </a>
    </div>
  );
}
