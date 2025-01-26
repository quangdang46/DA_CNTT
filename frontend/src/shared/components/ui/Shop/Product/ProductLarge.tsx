import Star from '@/shared/components/icons/Star';
import Image from 'next/image';
import React from 'react'

export default function ProductLarge() {
  return (
    <div className="products">
      <div className="product list-view-large">
        <div className="media">
          <Image
            width={224}
            height={197}
            alt=""
            className="attachment-shop_catalog size-shop_catalog wp-post-image"
            src="https://images.unsplash.com/photo-1736942900911-96fe2afc5b96?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
              {/* .yith-wcwl-add-to-wishlist */}
              <a
                className="woocommerce-LoopProduct-link woocommerce-loop-product__link"
                href="single-product-fullwidth.html"
              >
                <h2 className="woocommerce-loop-product__title">
                  60UH6150 60-Inch 4K Ultra HD Smart LED TV
                </h2>
                <div className="techmarket-product-rating">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index}></Star>
                  ))}
                  <span className="review-count">(1)</span>
                </div>
              </a>
              {/* .woocommerce-LoopProduct-link */}
              <div className="brand">
                <a href="#">
                  <Image
                    width={224}
                    height={197}
                    alt=""
                    className="attachment-shop_catalog size-shop_catalog wp-post-image"
                    src="https://images.unsplash.com/photo-1736942900911-96fe2afc5b96?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  />
                </a>
              </div>
              {/* .brand */}
              <div className="woocommerce-product-details__short-description">
                <ul>
                  <li>
                    CUJO smart firewall brings business-level Internet security
                    to protect all of your home devices
                  </li>
                  <li>
                    Internet Security: Guard your network and smart devices
                    against hacks, malware, and cyber threats
                  </li>
                  <li>
                    Mobile App: Monitor your wired and wireless network activity
                    with a sleek iPhone or Android app
                  </li>
                  <li>
                    CUJO connects to your wireless router with an ethernet
                    cable. CUJO is not compatible with Luma and does not support
                    Google Wifi Mesh. CUJO works with Eero in Bridge mode.
                  </li>
                </ul>
              </div>
              {/* .woocommerce-product-details__short-description */}
              <span className="sku_wrapper">
                SKU:
                <span className="sku">5487FB8/13</span>
              </span>
            </div>
            {/* .product-info */}
            <div className="product-actions">
              <div className="availability">
                Availability:
                <p className="stock in-stock">1000 in stock</p>
              </div>
              <span className="price">
                <span className="woocommerce-Price-amount amount">
                  <span className="woocommerce-Price-currencySymbol">$</span>
                  730.00
                </span>
              </span>
              {/* .price */}
              <a className="button add_to_cart_button" href="cart.html">
                Add to Cart
              </a>
              <a className="add-to-compare-link" href="compare.html">
                Add to compare
              </a>
            </div>
            {/* .product-actions */}
          </div>
          {/* .media-body */}
        </div>
        {/* .media */}
      </div>
    </div>
  );
}
