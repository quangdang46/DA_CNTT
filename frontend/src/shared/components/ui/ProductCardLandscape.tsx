import Star from "@/shared/components/icons/Star";
import { Product } from "@/shared/types/ProductTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductCardLandscape({
  product,
}: {
  product: Product;
}) {
  return (
    <div className={`landscape-product product`}>
      <Link className="woocommerce-LoopProduct-link" href={product.imageUrl}>
        <div className="media">
          <Image
            className="wp-post-image"
            src={product.imageUrl}
            alt={product.title}
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
                <span className="amount">{product.price}</span>
              </del>
            </span>
            <h2 className="woocommerce-loop-product__title">{product.title}</h2>
            <div className="techmarket-product-rating">
              <div className="d-flex align-items-center gap-1">
                {Array.from({ length: product.rating }).map((_, index) => (
                  <Star key={index}></Star>
                ))}
              </div>
              <span className="review-count">({product.rating})</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
