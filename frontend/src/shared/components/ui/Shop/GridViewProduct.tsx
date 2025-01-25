import Image from "next/image";
import React from "react";

export default function GridViewProduct() {
  return (
    <div id="grid" className="tab-pane" role="tabpanel">
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
                XONE Wireless Controller
              </h2>
            </a>
            {/* .woocommerce-LoopProduct-link */}
            <div className="hover-area">
              <a className="button" href="cart.html">
                Add to cart
              </a>
              <a className="add-to-compare-link" href="compare.html">
                Add to compare
              </a>
            </div>
            {/* .hover-area */}
          </div>
        </div>
        {/* .products */}
      </div>
      {/* .woocommerce */}
    </div>
  );
}
