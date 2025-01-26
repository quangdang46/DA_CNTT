import Star from "@/shared/components/icons/Star";
import { Product } from "@/shared/types/ProductTypes";
import Image from "next/image";
import React from "react";
interface Props {
  product: Product;
}
export default function ProductLarge({ product }: Props) {
  return (
    <div className="products">
      <div className="product list-view-large">
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
                href="single-product-fullwidth.html"
              >
                <h2 className="woocommerce-loop-product__title">
                  {product.name}
                </h2>
                <div className="techmarket-product-rating">
                  {Array(Math.floor(product.rating))
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i}></Star>
                    ))}
                  <span className="review-count">(1)</span>
                </div>
              </a>
              <div className="brand">
                <a href="#">
                  <Image
                    width={224}
                    height={197}
                    alt=""
                    className="attachment-shop_catalog size-shop_catalog wp-post-image"
                    src="/static/images/brands/1.png"
                  />
                </a>
              </div>
              <div className="woocommerce-product-details__short-description">
                <ul>
                  <li>{product.description}</li>
                </ul>
              </div>
              <span className="sku_wrapper">
                SKU:
                <span className="sku">5487FB8/13</span>
              </span>
            </div>
            <div className="product-actions">
              <div className="availability">
                Availability:
                <p className="stock in-stock">1000 in stock</p>
              </div>
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
    </div>
  );
}
