import { Product } from "@/shared/types/ProductTypes";
import { Star, StarHalf } from "lucide-react";
import Image from "next/image";
import React from "react";
interface Props {
  product: Product;
}
export default function ProductSmall({ product }: Props) {
  return (
    <div className="product list-view-small">
      <div className="media">
        <Image
          width={224}
          height={197}
          alt={product.name}
          className="attachment-shop_catalog size-shop_catalog wp-post-image"
          src={product.images[0].image_url}
        />
        <div className="media-body">
          <div className="product-info">
            <div className="yith-wcwl-add-to-wishlist">
              <a
                href="wishlist.html"
                rel="nofollow"
                className="add_to_wishlist"
              >
                {" "}
                Add to Wishlist
              </a>
            </div>
            <a
              className="woocommerce-LoopProduct-link woocommerce-loop-product__link"
              href={`/details/${product.slug}`}
            >
              <h2 className="woocommerce-loop-product__title">
                {product.name}
              </h2>
              <div className="techmarket-product-rating">
                {Array(Math.floor(product.rating))
                  .fill(0)
                  .map((_, i) => (
                    <Star strokeWidth={1} key={`full-${i}`} />
                  ))}

                {product.rating % 1 !== 0 && (
                  <StarHalf strokeWidth={1} key="half-star" />
                )}
                <span className="review-count">(1)</span>
              </div>
            </a>
            <div className="woocommerce-product-details__short-description">
              <ul>
                <li>{product.description}</li>
              </ul>
            </div>
          </div>
          <div className="product-actions">
            <span className="price">
              <span className="woocommerce-Price-amount amount">
                <span className="woocommerce-Price-currencySymbol">$</span>
                {product.price}
              </span>
            </span>
            <a className="button add_to_cart_button" href="cart.html">
              Add to Cart
            </a>
            <a className="add-to-compare-link" href="compare.html">
              Add to compare
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
