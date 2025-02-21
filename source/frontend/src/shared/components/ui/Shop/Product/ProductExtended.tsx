import { RatingStars } from "@/shared/components/ui/RatingStars";
import { Product } from "@/shared/types/ProductTypes";
import Image from "next/image";
import React from "react";
interface Props {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToCompare?: (product: Product) => void;
}
export default function ProductExtended({
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
      <a
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
      </a>
      <div className="techmarket-product-rating">
        <>
          <RatingStars rating={product.rating}></RatingStars>
        </>

        <span className="review-count">({product.review_count})</span>
      </div>
      <span className="sku_wrapper">
        SKU:
        <span className="sku">5487FB8/13</span>
      </span>
      <div className="woocommerce-product-details__short-description">
        <ul>
          {product.attributes ? (
            Object.entries(product.attributes).map(([atr, value], index) => (
              <li key={index}>{value}</li>
            ))
          ) : (
            <div>No attributes available</div>
          )}
        </ul>
      </div>
      <button
        className="button product_type_simple add_to_cart_button"
        onClick={() => onAddToCart(product)}
      >
        Add to cart
      </button>
      <button
        className="add-to-compare-link"
        onClick={() => onAddToCompare(product)}
      >
        Add to compare
      </button>
    </div>
  );
}
