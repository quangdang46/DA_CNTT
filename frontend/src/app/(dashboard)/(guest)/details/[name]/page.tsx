import Star from "@/shared/components/icons/Star";
import WrapperContent from "@/shared/components/layouts/WrapperContent";
import BrandsCarousel from "@/shared/components/ui/BrandsCarousel";
import RecommendedProducts from "@/shared/components/ui/RecommendedProducts";
import SingleProductGallery from "@/shared/components/ui/SingleProductGallery";
import { products } from "@/shared/constants/products-test";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <WrapperContent className="single-product">
      <div className="product product-type-simple">
        <div className="single-product-wrapper">
          {/* anh */}
          <div className="product-images-wrapper thumb-count-4">
            <span className="onsale">
              -
              <span className="woocommerce-Price-amount amount">
                <span className="woocommerce-Price-currencySymbol">$</span>
                242.99
              </span>
            </span>
            {/* ////////////// */}
            {/* ////////////// */}
            <SingleProductGallery></SingleProductGallery>
          </div>

          {/* detail san pham */}
          <div className="summary entry-summary">
            <div className="single-product-header">
              <h1 className="product_title entry-title">
                60UH6150 60-Inch 4K Ultra HD Smart LED TV
              </h1>
              <a className="add-to-wishlist" href="wishlist.html">
                Add to Wishlist
              </a>
            </div>
            <div className="single-product-meta">
              <div className="brand">
                <a href="#">
                  <Image
                    alt="galaxy"
                    src="https://images.unsplash.com/photo-1529653762956-b0a27278529c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    width={100}
                    height={50}
                  />
                </a>
              </div>
              <div className="cat-and-sku">
                <span className="posted_in categories">
                  <a rel="tag" href="product-category.html">
                    TV &amp; Video
                  </a>
                </span>
                <span className="sku_wrapper">
                  SKU:
                  <span className="sku">5487FB8/11</span>
                </span>
              </div>
              <div className="product-label">
                <div className="ribbon label green-label">
                  <span>A+</span>
                </div>
              </div>
            </div>
            <div className="rating-and-sharing-wrapper">
              <div className="woocommerce-product-rating">
                <div className="star-rating">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i}></Star>
                    ))}
                  <span style={{ width: "100%" }}>
                    Rated
                    <strong className="rating">5.00</strong> out of 5 based on
                    <span className="rating">1</span> customer rating
                  </span>
                </div>
                <a
                  rel="nofollow"
                  className="woocommerce-review-link"
                  href="#reviews"
                >
                  (<span className="count">1</span> customer review)
                </a>
              </div>
            </div>
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
            <div className="product-actions-wrapper">
              <div className="product-actions">
                <p className="price">
                  <del>
                    <span className="woocommerce-Price-amount amount">
                      <span className="woocommerce-Price-currencySymbol">
                        $
                      </span>
                      1,239.99
                    </span>
                  </del>
                  <ins>
                    <span className="woocommerce-Price-amount amount">
                      <span className="woocommerce-Price-currencySymbol">
                        $
                      </span>
                      997.00
                    </span>
                  </ins>
                </p>
                <form method="post" className="cart" autoComplete="off">
                  <div className="quantity">
                    <label htmlFor="quantity-input">Quantity</label>
                    <input
                      type="number"
                      size={4}
                      className="input-text qty text"
                      title="Qty"
                      defaultValue="1"
                      name="quantity"
                      id="quantity-input"
                    />
                  </div>
                  {/* .quantity */}
                  <button
                    className="single_add_to_cart_button button alt"
                    value="185"
                    name="add-to-cart"
                    type="submit"
                  >
                    Add to cart
                  </button>
                </form>
                {/* .cart */}
                <a className="add-to-compare-link" href="compare.html">
                  Add to compare
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* ///////////// */}
        <RecommendedProducts products={products}></RecommendedProducts>
        {/* ///////////// */}
        <BrandsCarousel></BrandsCarousel>
      </div>
    </WrapperContent>
  );
};

export default page;
