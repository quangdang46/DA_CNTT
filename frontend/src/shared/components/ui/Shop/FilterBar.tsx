import React from 'react'

export default function FilterBar() {
  return (
    <div
      id="secondary"
      className="widget-area shop-sidebar"
      role="complementary"
    >
      <div
        id="techmarket_products_filter-3"
        className="widget widget_techmarket_products_filter"
      >
        <span className="gamma widget-title">Filters</span>
        <div
          className="widget woocommerce widget_price_filter"
          id="woocommerce_price_filter-2"
        >
          <p>
            <span className="gamma widget-title">Filter by price</span>
          </p>
          <div className="price_slider_amount">
            <input
              id="amount"
              type="text"
              placeholder="Min price"
              data-min={6}
              defaultValue={33}
              name="min_price"
              style={{ display: "none" }}
            />
            <button className="button" type="submit">
              Filter
            </button>
          </div>
          <div id="slider-range" className="price_slider" />
        </div>
        <div
          className="widget woocommerce widget_layered_nav maxlist-more"
          id="woocommerce_layered_nav-2"
        >
          <span className="gamma widget-title">Brands</span>
          <ul>
            <li className="wc-layered-nav-term">
              <a href="#">apple</a>
              <span className="count">(2)</span>
            </li>
            <li className="wc-layered-nav-term">
              <a href="#">bosch</a>
              <span className="count">(1)</span>
            </li>
            <li className="wc-layered-nav-term">
              <a href="#">cannon</a>
              <span className="count">(1)</span>
            </li>
            <li className="wc-layered-nav-term">
              <a href="#">connect</a>
              <span className="count">(1)</span>
            </li>
            <li className="wc-layered-nav-term">
              <a href="#">galaxy</a>
              <span className="count">(3)</span>
            </li>
            <li className="wc-layered-nav-term">
              <a href="#">gopro</a>
              <span className="count">(1)</span>
            </li>
            <li className="wc-layered-nav-term">
              <a href="#">kinova</a>
              <span className="count">(1)</span>
            </li>
            <li className="wc-layered-nav-term">
              <a href="#">samsung</a>
              <span className="count">(1)</span>
            </li>
          </ul>
        </div>
        {/* .woocommerce widget_layered_nav */}
        <div
          className="widget woocommerce widget_layered_nav maxlist-more"
          id="woocommerce_layered_nav-3"
        >
          <span className="gamma widget-title">Color</span>
          <ul>
            <li className="wc-layered-nav-term">
              <a href="#">Black</a>
              <span className="count">(4)</span>
            </li>
            <li className="wc-layered-nav-term">
              <a href="#">Blue</a>
              <span className="count">(4)</span>
            </li>
            <li className="wc-layered-nav-term">
              <a href="#">Green</a>
              <span className="count">(5)</span>
            </li>
            <li className="wc-layered-nav-term">
              <a href="#">Orange</a>
              <span className="count">(5)</span>
            </li>
            <li className="wc-layered-nav-term">
              <a href="#">Red</a>
              <span className="count">(4)</span>
            </li>
            <li className="wc-layered-nav-term">
              <a href="#">Yellow</a>
              <span className="count">(5)</span>
            </li>
            <li className="wc-layered-nav-term">
              <a href="#">Green</a>
              <span className="count">(5)</span>
            </li>
            <li className="wc-layered-nav-term">
              <a href="#">Orange</a>
              <span className="count">(5)</span>
            </li>
            <li className="wc-layered-nav-term">
              <a href="#">Red</a>
              <span className="count">(4)</span>
            </li>
            <li className="wc-layered-nav-term">
              <a href="#">Yellow</a>
              <span className="count">(5)</span>
            </li>
          </ul>
        </div>
        {/* .woocommerce widget_layered_nav */}
      </div>
      <div className="widget widget_techmarket_products_carousel_widget">
        <section
          id="single-sidebar-carousel"
          className="section-products-carousel"
        >
          <header className="section-header">
            <h2 className="section-title">Latest Products</h2>
            <nav className="custom-slick-nav" />
          </header>
          <div className="products-carousel">
            <div className="container-fluid">
              <div className="woocommerce columns-1">
                <div className="products">
                  <div className="landscape-product-widget product">
                    <a
                      className="woocommerce-LoopProduct-link"
                      href="single-product-fullwidth.html"
                    >
                      <div className="media">
                        <img
                          className="wp-post-image"
                          src="assets/images/products/sm-1.jpg"
                          alt=""
                        />
                        <div className="media-body">
                          <span className="price">
                            <ins>
                              <span className="amount"> 50.99</span>
                            </ins>
                            <del>
                              <span className="amount">26.99</span>
                            </del>
                          </span>
                          {/* .price */}
                          <h2 className="woocommerce-loop-product__title">
                            S100 Wireless Bluetooth Speaker – Neon Green
                          </h2>
                          <div className="techmarket-product-rating">
                            <div
                              title="Rated 0 out of 5"
                              className="star-rating"
                            >
                              <span style={{ width: "0%" }}>
                                <strong className="rating">0</strong> out of 5
                              </span>
                            </div>
                            <span className="review-count">(0)</span>
                          </div>
                          {/* .techmarket-product-rating */}
                        </div>
                        {/* .media-body */}
                      </div>
                      {/* .media */}
                    </a>
                    {/* .woocommerce-LoopProduct-link */}
                  </div>
                  <div className="landscape-product-widget product">
                    <a
                      className="woocommerce-LoopProduct-link"
                      href="single-product-fullwidth.html"
                    >
                      <div className="media">
                        <img
                          className="wp-post-image"
                          src="assets/images/products/sm-2.jpg"
                          alt=""
                        />
                        <div className="media-body">
                          <span className="price">
                            <ins>
                              <span className="amount"> 50.99</span>
                            </ins>
                            <del>
                              <span className="amount">26.99</span>
                            </del>
                          </span>
                          {/* .price */}
                          <h2 className="woocommerce-loop-product__title">
                            S100 Wireless Bluetooth Speaker – Neon Green
                          </h2>
                          <div className="techmarket-product-rating">
                            <div
                              title="Rated 0 out of 5"
                              className="star-rating"
                            >
                              <span style={{ width: "0%" }}>
                                <strong className="rating">0</strong> out of 5
                              </span>
                            </div>
                            <span className="review-count">(0)</span>
                          </div>
                          {/* .techmarket-product-rating */}
                        </div>
                        {/* .media-body */}
                      </div>
                      {/* .media */}
                    </a>
                    {/* .woocommerce-LoopProduct-link */}
                  </div>
                  <div className="landscape-product-widget product">
                    <a
                      className="woocommerce-LoopProduct-link"
                      href="single-product-fullwidth.html"
                    >
                      <div className="media">
                        <img
                          className="wp-post-image"
                          src="assets/images/products/sm-3.jpg"
                          alt=""
                        />
                        <div className="media-body">
                          <span className="price">
                            <ins>
                              <span className="amount"> 50.99</span>
                            </ins>
                            <del>
                              <span className="amount">26.99</span>
                            </del>
                          </span>
                          {/* .price */}
                          <h2 className="woocommerce-loop-product__title">
                            S100 Wireless Bluetooth Speaker – Neon Green
                          </h2>
                          <div className="techmarket-product-rating">
                            <div
                              title="Rated 0 out of 5"
                              className="star-rating"
                            >
                              <span style={{ width: "0%" }}>
                                <strong className="rating">0</strong> out of 5
                              </span>
                            </div>
                            <span className="review-count">(0)</span>
                          </div>
                          {/* .techmarket-product-rating */}
                        </div>
                        {/* .media-body */}
                      </div>
                      {/* .media */}
                    </a>
                    {/* .woocommerce-LoopProduct-link */}
                  </div>
                  <div className="landscape-product-widget product">
                    <a
                      className="woocommerce-LoopProduct-link"
                      href="single-product-fullwidth.html"
                    >
                      <div className="media">
                        <img
                          className="wp-post-image"
                          src="assets/images/products/sm-4.jpg"
                          alt=""
                        />
                        <div className="media-body">
                          <span className="price">
                            <ins>
                              <span className="amount"> 50.99</span>
                            </ins>
                            <del>
                              <span className="amount">26.99</span>
                            </del>
                          </span>
                          {/* .price */}
                          <h2 className="woocommerce-loop-product__title">
                            S100 Wireless Bluetooth Speaker – Neon Green
                          </h2>
                          <div className="techmarket-product-rating">
                            <div
                              title="Rated 0 out of 5"
                              className="star-rating"
                            >
                              <span style={{ width: "0%" }}>
                                <strong className="rating">0</strong> out of 5
                              </span>
                            </div>
                            <span className="review-count">(0)</span>
                          </div>
                          {/* .techmarket-product-rating */}
                        </div>
                        {/* .media-body */}
                      </div>
                      {/* .media */}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
