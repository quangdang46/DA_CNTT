import React from "react";

export default function GridListView() {
  return (
    <div id="list-view" className="tab-pane" role="tabpanel">
      <div className="woocommerce columns-1">
        <div className="products">
          <div className="product list-view ">
            <div className="media">
              <img
                width={224}
                height={197}
                alt=""
                className="attachment-shop_catalog size-shop_catalog wp-post-image"
                src="assets/images/products/1.jpg"
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
                      <div title="Rated 5.00 out of 5" className="star-rating">
                        <span style={{ width: "100%" }}>
                          <strong className="rating">5.00</strong> out of 5
                        </span>
                      </div>
                      <span className="review-count">(1)</span>
                    </div>
                  </a>
                  {/* .woocommerce-LoopProduct-link */}
                  <div className="brand">
                    <a href="#">
                      <img alt="galaxy" src="assets/images/brands/5.png" />
                    </a>
                  </div>
                  {/* .brand */}
                  <div className="woocommerce-product-details__short-description">
                    <ul>
                      <li>
                        CUJO smart firewall brings business-level Internet
                        security to protect all of your home devices
                      </li>
                      <li>
                        Internet Security: Guard your network and smart devices
                        against hacks, malware, and cyber threats
                      </li>
                      <li>
                        Mobile App: Monitor your wired and wireless network
                        activity with a sleek iPhone or Android app
                      </li>
                      <li>
                        CUJO connects to your wireless router with an ethernet
                        cable. CUJO is not compatible with Luma and does not
                        support Google Wifi Mesh. CUJO works with Eero in Bridge
                        mode.
                      </li>
                    </ul>
                  </div>
                  {/* .woocommerce-product-details__short-description */}
                </div>
                {/* .product-info */}
                <div className="product-actions">
                  <div className="availability">
                    Availability:
                    <p className="stock in-stock">1000 in stock</p>
                  </div>
                  <span className="price">
                    <span className="woocommerce-Price-amount amount">
                      <span className="woocommerce-Price-currencySymbol">
                        $
                      </span>
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

          {/* .product */}
        </div>
        {/* .products */}
      </div>
      {/* .woocommerce */}
    </div>
  );
}
