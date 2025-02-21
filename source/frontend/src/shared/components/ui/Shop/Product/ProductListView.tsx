import { RatingStars } from "@/shared/components/ui/RatingStars";
import { Product } from "@/shared/types/ProductTypes";
import Image from "next/image";
import React from "react";
interface Props {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToCompare?: (product: Product) => void;
}
export default function ProductListView({
  product,
  onAddToCompare = () => {},
  onAddToCart = () => {},
}: Props) {
  return (
    <div className="product list-view ">
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
                    <RatingStars rating={product.rating}></RatingStars>
          
                <span className="review-count">({product.review_count})</span>
              </div>
            </a>
            <div className="brand">
              <a href="#">
                <Image
                  alt="galaxy"
                  src="/static/images/brands/1.png"
                  width={224}
                  height={197}
                />
              </a>
            </div>
            <div className="woocommerce-product-details__short-description">
              <ul>
                <li>{product.description}</li>
              </ul>
            </div>
          </div>
          <div className="product-actions">
            <div className="availability">
              Availability:
              <p className="stock in-stock">1000 in stock</p>
            </div>
            <span className="price">
              <span className="woocommerce-Price-amount amount">
                {Math.round(product.price)}
                <span className="woocommerce-Price-currencySymbol">VNĐ</span>
              </span>
            </span>
            {/* .price */}
            <button
              className="button add_to_cart_button"
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </button>
            <button
              className="add-to-compare-link"
              onClick={() => onAddToCompare(product)}
            >
              Add to compare
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
