import Star from '@/shared/components/icons/Star';
import Image from 'next/image';
import React from 'react'

export default function GridExtendedProduct() {
  return (
    <div id="grid-extended" className="tab-pane active" role="tabpanel">
      <div className="woocommerce columns-4">
        <div className="products">
          <div className="product first">
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
              <Image
                width={224}
                height={197}
                alt=""
                className="attachment-shop_catalog size-shop_catalog wp-post-image"
                src="https://images.unsplash.com/photo-1736942900911-96fe2afc5b96?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
              <span className="price">
                <span className="woocommerce-Price-amount amount">
                  <span className="woocommerce-Price-currencySymbol">$</span>
                  800.00
                </span>
              </span>
              <h2 className="woocommerce-loop-product__title">
                Gear Virtual Reality 3D with Bluetooth Glasses
              </h2>
            </a>
            {/* .woocommerce-LoopProduct-link */}
            <div className="techmarket-product-rating">
              {Array.from({ length: 5 }, (_, index) => (
                                      <Star key={index}></Star>
                                    ))}
              <span className="review-count">(1)</span>
            </div>
            {/* .techmarket-product-rating */}
            <span className="sku_wrapper">
              SKU:
              <span className="sku">5487FB8/13</span>
            </span>
            <div className="woocommerce-product-details__short-description">
              <ul>
                <li>Multimedia Speakers</li>
                <li>120 watts peak</li>
                <li>Front-facing subwoofer</li>
                <li>Refresh Rate: 120Hz (Effective)</li>
                <li>Backlight: LED</li>
                <li>Smart Functionality: Yes, webOS 3.0</li>
                <li>
                  Dimensions (W x H x D): TV without stand: 43.5″ x 25.4″ x
                  3.0″, TV with stand: 43.5″ x 27.6″ x 8.5″
                </li>
                <li>
                  Inputs: 3 HMDI, 2 USB, 1 RF, 1 Component, 1 Composite, 1
                  Optical, 1 RS232C, 1 Ethernet
                </li>
              </ul>
            </div>
            {/* .woocommerce-product-details__short-description */}
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
        </div>
        {/* .products */}
      </div>
      {/* .woocommerce */}
    </div>
  );
}
