import Star from "@/shared/components/icons/Star";
import { Product } from "@/shared/types/ProductTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductCardLandscape({
  product,
  version = 1,
}: {
  product: Product;
  version?: number;
}) {

  /*
  
  
  */
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
                {Array.from({ length: product.rating }).map((_, index) => (
                  <Star key={index}></Star>
                ))}
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
        {/* Add to Wishlist */}
        <div className="yith-wcwl-add-to-wishlist">
          <Link href="/wishlist" rel="nofollow" className="add_to_wishlist">
            Add to Wishlist
          </Link>
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
            <Link href="/cart" className="button add_to_cart_button">
              Add to cart
            </Link>
            <Link href="/compare" className="add-to-compare-link">
              Add to compare
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
