"use client";
import productApiRequest from "@/shared/apiRequests/product";
import Star from "@/shared/components/icons/Star";
import ProductTabs from "@/shared/components/layouts/ProductTabs";
import WrapperContent from "@/shared/components/layouts/WrapperContent";
import BrandsCarousel from "@/shared/components/ui/BrandsCarousel";
import RecommendedProducts from "@/shared/components/ui/RecommendedProducts";
import SingleProductGallery from "@/shared/components/ui/SingleProductGallery";
import { GalleryProvider } from "@/shared/contexts/GalleryContext";
import { Product } from "@/shared/types/ProductTypes";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

export default function Page() {
  const { slug } = useParams(); // Lấy slug từ URL

  const { data, isLoading, error } = productApiRequest.useProductDetail(
    slug as string
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.data) return <div>Product not found</div>;

  const product = data.data as Product;
  const thumbnails = product.images.map((image) => image.image_url);
  return (
    <GalleryProvider>
      <WrapperContent className="single-product">
        <div className="product product-type-simple">
          <div className="single-product-wrapper">
            {/* anh */}
            <div className="product-images-wrapper thumb-count-4">
              <span className="onsale">
                -
                <span className="woocommerce-Price-amount amount">
                  <span className="woocommerce-Price-currencySymbol">$</span>
                  {product.price}
                </span>
              </span>
              {/* ////////////// */}
              {/* ////////////// */}
              <SingleProductGallery
                thumbnails={thumbnails}
              ></SingleProductGallery>
            </div>

            {/* detail san pham */}
            <div className="summary entry-summary">
              <div className="single-product-header">
                <h1 className="product_title entry-title">{product.name}</h1>
                <a className="add-to-wishlist" href="wishlist.html">
                  Add to Wishlist
                </a>
              </div>
              <div className="single-product-meta">
                <div className="brand">
                  <a href="#">
                    <Image
                      alt="galaxy"
                      src="/static/images/brands/1.png"
                      width={100}
                      height={50}
                    />
                  </a>
                </div>
                <div className="cat-and-sku">
                  <span className="posted_in categories">
                    <a rel="tag" href="product-category.html">
                      {product.category.name}
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
                    {Array(Math.floor(product.rating))
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i}></Star>
                      ))}
                    <span style={{ width: "100%" }}>
                      Rated
                      <strong className="rating">5.00</strong> out of 5 based on
                      <span className="rating">
                        {product.review_count}
                      </span>{" "}
                      customer rating
                    </span>
                  </div>
                  <a
                    rel="nofollow"
                    className="woocommerce-review-link"
                    href="#reviews"
                  >
                    (<span className="count">{product.review_count}</span>{" "}
                    customer review)
                  </a>
                </div>
              </div>
              <div className="woocommerce-product-details__short-description">
                <ul>
                  {/* <li>Multimedia Speakers</li>
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
                </li> */}

                  {product.attributes && product.attributes.length > 0 ? (
                    Object.entries(product.attributes[0]).map(
                      ([key, value], index) => (
                        <div key={index}>
                          <strong style={{ textTransform: "capitalize" }}>
                            {key}:
                          </strong>{" "}
                          {value}
                        </div>
                      )
                    )
                  ) : (
                    <div>No attributes available</div>
                  )}
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
          <RecommendedProducts></RecommendedProducts>
          {/* ///////////// */}
          <BrandsCarousel></BrandsCarousel>

          <ProductTabs product={product}></ProductTabs>
        </div>
      </WrapperContent>
    </GalleryProvider>
  );
}
