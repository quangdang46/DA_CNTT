import { useWishlist } from "@/shared/hooks/useWishlist";
import { Product } from "@/shared/types/ProductTypes";
import { Heart, Star, StarHalf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductCardLandscape({
  product,
  version = 1,
  onAddToCompare = () => {},
  onAddToCart = () => {},
}: {
  product: Product;
  version?: number;
  onAddToCart?: (product: Product) => void;
  onAddToCompare?: (product: Product) => void;
}) {
  /*
  
  
  */

  const { isInWishlist, toggleWishlist } = useWishlist();

  return version == 1 ? (
    <div className={`landscape-product product`}>
      <Link
        className="woocommerce-LoopProduct-link"
        href={`/details/${product.slug}`}
      >
        <div className="media">
          <Image
            className="wp-post-image"
            src={product.images[1].image_url}
            alt={""}
            width={0}
            height={0}
            style={{ width: "200px", height: "130px" }} // optional
          />
          <div className="media-body">
            <span className="price">
              <ins>
                <span className="amount">{product.price}</span>
              </ins>
              <del>
                <span className="amount">{`${product.price * 1.2}`}</span>
              </del>
            </span>
            <h2 className="woocommerce-loop-product__title">{product.name}</h2>
            <div className="techmarket-product-rating">
              <div className="d-flex align-items-center gap-1">
                {Array(Math.floor(product.rating))
                  .fill(0)
                  .map((_, i) => (
                    <Star strokeWidth={1} key={`full-${i}`} />
                  ))}

                {product.rating % 1 !== 0 && (
                  <StarHalf strokeWidth={1} key="half-star" />
                )}
              </div>
              <span className="review-count">({product.review_count})</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  ) : (
    <div className="landscape-product-card product">
      <div className="media">
        <div className="wish-list" onClick={() => toggleWishlist(product.id)}>
          <div className="button_add_to_wishlist">
            <Heart
              strokeWidth={1}
              size={30}
              fill={`${isInWishlist(product.id) ? "red" : "none"}`}
            />
          </div>
        </div>

        {/* Product Image and Link */}
        <Link
          href={product.images[1].image_url}
          className="woocommerce-LoopProduct-link"
        >
          <Image
            className="wp-post-image"
            src={product.images[1].image_url}
            alt={" "}
            width={0}
            height={0}
            style={{ width: "200px", height: "200px" }}
          />
        </Link>

        <div className="media-body">
          <Link
            href={`/details/${product.slug}`}
            className="woocommerce-LoopProduct-link"
          >
            <span className="price">
              <ins>
                <span className="amount">{product.price}</span>
              </ins>
              <del>
                <span className="amount">{`${product.price * 1.2}`}</span>
              </del>
            </span>
            <h2 className="woocommerce-loop-product__title">{product.name}</h2>
            <div className="ribbon green-label">
              <span>{"A++"}</span>
            </div>
            <div className="techmarket-product-rating d-flex gap-0">
              <div className="d-flex align-items-center gap-1">
                {Array.from({ length: product.rating }).map((_, index) => (
                  <Star key={index}></Star>
                ))}
              </div>
              <span className="review-count">({product.review_count})</span>
            </div>
          </Link>

          <div className="hover-area">
            <button
              className="button add_to_cart_button"
              onClick={() => onAddToCart(product)}
            >
              Add to cart
            </button>
            <button
              className="add-to-compare-link"
              onClick={() => onAddToCompare(product)}
            >
              Add to Compare
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
