"use client";
import productApiRequest from "@/shared/apiRequests/product";
import ProductTabs from "@/shared/components/layouts/ProductTabs";
import WrapperContent from "@/shared/components/layouts/WrapperContent";
import BrandsCarousel from "@/shared/components/ui/BrandsCarousel";
import RecommendedProducts from "@/shared/components/ui/RecommendedProducts";
import SingleProductGallery from "@/shared/components/ui/SingleProductGallery";
import { GalleryProvider } from "@/shared/contexts/GalleryContext";
import { useCart } from "@/shared/hooks/useCart";
import useCompare from "@/shared/hooks/useCompare";
import { useWishlist } from "@/shared/hooks/useWishlist";
import { Product } from "@/shared/types/ProductTypes";
import { Heart, Star, StarHalf } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

export default function Page() {
  const { handleAddToCompare, CompareModal } = useCompare();
  const { handleAddToCart } = useCart();
  const { slug } = useParams(); // Lấy slug từ URL
  const { isInWishlist, toggleWishlist } = useWishlist();

  const { data, isLoading, error } = productApiRequest.useProductDetail(
    slug as string
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.data) return <div>Product not found</div>;

  const product = data.data as Product;
  console.log(product);
  const thumbnails = product.images.map((image) => image.image_url);
  return (
    <>
      <CompareModal></CompareModal>
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
                  <button
                    className="add-to-wishlist"
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <Heart
                      strokeWidth={1}
                      size={30}
                      fill={`${isInWishlist(product.id) ? "red" : "none"}`}
                    />
                  </button>
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
                          <Star strokeWidth={1} key={`full-${i}`} />
                        ))}

                      {product.rating % 1 !== 0 && (
                        <StarHalf strokeWidth={1} key="half-star" />
                      )}
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
                    {product.attributes &&
                    product.attributes !== null &&
                    Object.entries(product.attributes).length ? (
                      Object.entries(product.attributes).map(
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
                            VNĐ
                          </span>
                          1,239.99
                        </span>
                      </del>
                      <ins>
                        <span className="woocommerce-Price-amount amount">
                          <span className="woocommerce-Price-currencySymbol">
                            VNĐ
                          </span>
                          997.00
                        </span>
                      </ins>
                    </p>
                    <form method="post" className="cart" autoComplete="off">
                      {/* <div className="quantity">
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
                      </div> */}
                      <button
                        className="single_add_to_cart_button button alt"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to cart
                      </button>
                    </form>
                    <button
                      className="add-to-compare-link"
                      onClick={() => handleAddToCompare(product)}
                    >
                      Add to Compare
                    </button>
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
    </>
  );
}
