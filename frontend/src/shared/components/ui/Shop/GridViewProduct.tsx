import React from 'react'

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
              <img
                width={224}
                height={197}
                alt=""
                className="attachment-shop_catalog size-shop_catalog wp-post-image"
                src="assets/images/products/1.jpg"
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
