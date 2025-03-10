"use client";
import productApiRequest from "@/shared/apiRequests/product";
import ProductTabs from "@/shared/components/layouts/ProductTabs";
import WrapperContent from "@/shared/components/layouts/WrapperContent";
import BrandsCarousel from "@/shared/components/ui/BrandsCarousel";
import { RatingStars } from "@/shared/components/ui/RatingStars";
import RecommendedProducts from "@/shared/components/ui/RecommendedProducts";
import SingleProductGallery from "@/shared/components/ui/SingleProductGallery";
import { GalleryProvider } from "@/shared/contexts/GalleryContext";
import { useCart } from "@/shared/hooks/useCart";
import useCompare from "@/shared/hooks/useCompare";
import { useWishlist } from "@/shared/hooks/useWishlist";
import { Product } from "@/shared/types/ProductTypes";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import Skeleton from "react-loading-skeleton";
function ProductDetailSkeleton() {
  return (
    <WrapperContent className="single-product">
      <div className="product product-type-simple">
        <div className="single-product-wrapper">
          {/* Phần ảnh sản phẩm */}
          <div className="product-images-wrapper thumb-count-4">
            <Skeleton height={400} width="100%" />
          </div>

          {/* Phần chi tiết sản phẩm */}
          <div className="summary entry-summary">
            <div className="single-product-header">
              {/* Tiêu đề */}
              <h1 className="product_title entry-title">
                <Skeleton height={25} width="70%" />
              </h1>
              {/* Nút Wishlist */}
              <Skeleton height={40} width={40} />
            </div>

            {/* Meta thông tin */}
            <div className="single-product-meta">
              <div className="brand">
                <Skeleton height={50} width={100} />
              </div>
              <div className="cat-and-sku">
                <Skeleton height={20} width="40%" />
              </div>
              <div className="product-label">
                <Skeleton height={30} width={60} />
              </div>
            </div>

            {/* Đánh giá */}
            <div className="rating-and-sharing-wrapper">
              <Skeleton height={20} width="30%" />
            </div>

            {/* Mô tả ngắn */}
            <div className="woocommerce-product-details__short-description">
              <Skeleton count={3} />
            </div>

            {/* Giá và hành động */}
            <div className="product-actions-wrapper">
              <div className="product-actions">
                <p className="price">
                  <Skeleton height={20} width="50%" />
                </p>
                <Skeleton height={40} width="100%" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </WrapperContent>
  );
}
export default function Page() {
  const { handleAddToCompare, CompareModal } = useCompare();
  const { handleAddToCart } = useCart();
  const { slug } = useParams(); // Lấy slug từ URL
  const { isInWishlist, toggleWishlist } = useWishlist();

  const { data, isLoading, error } = productApiRequest.useProductDetail(
    slug as string
  );

  if (isLoading) return <ProductDetailSkeleton></ProductDetailSkeleton>;
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
              <div className="product-images-wrapper thumb-count-4">
                <span className="onsale">
                  -
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">$</span>
                    {Math.round(product.price)}
                  </span>
                </span>
                <SingleProductGallery
                  thumbnails={thumbnails}
                ></SingleProductGallery>
              </div>

              <div className="summary entry-summary">
                <div className="single-product-header">
                  <h1 className="product_title entry-title">{product.name}</h1>
                  <button
                    className=""
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
                      <RatingStars rating={product.rating}></RatingStars>
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
                          {Math.round(product.price * 2)}{" "}
                          <span className="woocommerce-Price-currencySymbol">
                            VNĐ
                          </span>
                        </span>
                      </del>
                      <ins>
                        <span className="woocommerce-Price-amount amount">
                          {Math.round(product.price)}{" "}
                          <span className="woocommerce-Price-currencySymbol">
                            VNĐ
                          </span>
                        </span>
                      </ins>
                    </p>
                    <form method="post" className="cart" autoComplete="off">
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
            {/* <BrandsCarousel></BrandsCarousel> */}

            <ProductTabs product={product}></ProductTabs>
          </div>
        </WrapperContent>
      </GalleryProvider>
    </>
  );
}
