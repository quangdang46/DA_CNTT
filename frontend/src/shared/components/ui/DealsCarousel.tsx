"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import ChevronLeft from "@/shared/components/icons/ChevronLeft";
import ChevronRight from "@/shared/components/icons/ChevronRight";
export default function DealsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true}, [Autoplay()]);
  const products = [
    {
      id: 1,
      title: "Tablet Red EliteBook Revolve",
      price: 425.89,
      originalPrice: 545.89,
      savedAmount: 120.0,
      imageUrl:
        "https://images.unsplash.com/photo-1736177046343-32c5d0f9bcc6?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Laptop EliteBook 1050",
      price: 599.99,
      originalPrice: 699.99,
      savedAmount: 100.0,
      imageUrl:
        "https://images.unsplash.com/photo-1735722446915-3147b65b05c3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    // Thêm các sản phẩm khác ở đây
  ];
  return (
    <div className="section-deals-carousel-and-products-carousel-tabs row">
      <section
        className="column-1 deals-carousel"
        id="sale-with-timer-carousel"
      >
        <div className="deals-carousel-inner-block">
          <header className="section-header">
            <h2 className="section-title">
              <strong>Deals</strong> of the week
            </h2>
            <nav className="custom-slick-nav">
              <a href="#" className="slick-arrow" aria-disabled="false">
                <ChevronLeft></ChevronLeft>
              </a>
              <a href="#" className="slick-arrow" aria-disabled="false">
                <ChevronRight></ChevronRight>
              </a>
            </nav>
          </header>

          {/* ///////////// */}
          <div className="sale-products-with-timer-carousel deals-carousel-v1">
            <div className="products-carousel">
              <div className="container-fluid">
                <div className="woocommerce columns-1">
                  <div className="embla">
                    <div className="embla__viewport" ref={emblaRef}>
                      <div className="embla__container">
                        {/* {Array.from({ length: 4 }).map((_, index) => (
                          <div className="embla__slide" key={index}>
                            <div className="sale-product-with-timer product">
                              <a
                                className="woocommerce-LoopProduct-link"
                                href="single-product-fullwidth.html"
                              >
                                <div className="sale-product-with-timer-header">
                                  <div className="price-and-title">
                                    <span className="price">
                                      <ins>
                                        <span className="woocommerce-Price-amount amount">
                                          <span className="woocommerce-Price-currencySymbol">
                                            $
                                          </span>
                                          425.89
                                        </span>
                                      </ins>
                                      <del>
                                        <span className="woocommerce-Price-amount amount">
                                          <span className="woocommerce-Price-currencySymbol">
                                            $
                                          </span>
                                          545.89
                                        </span>
                                      </del>
                                    </span>
                                    <h2 className="woocommerce-loop-product__title">
                                      Tablet Red EliteBook Revolve
                                    </h2>
                                  </div>
                                  <div className="sale-label-outer">
                                    <div className="sale-saved-label">
                                      <span className="saved-label-text">
                                        Save
                                      </span>
                                      <span className="saved-label-amount">
                                        <span className="woocommerce-Price-amount amount">
                                          <span className="woocommerce-Price-currencySymbol">
                                            $
                                          </span>
                                          120.00
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <Image
                                  width="224"
                                  height="197"
                                  alt=""
                                  className="wp-post-image"
                                  src="https://images.unsplash.com/photo-1736177046343-32c5d0f9bcc6?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                />
                                <div className="deal-progress">
                                  <div className="deal-stock">
                                    <div className="stock-sold">
                                      Already Sold: <strong>0</strong>
                                    </div>
                                    <div className="stock-available">
                                      Available: <strong>1000</strong>
                                    </div>
                                  </div>
                                  <div className="progress">
                                    <span
                                      style={{ width: "0%" }}
                                      className="progress-bar"
                                    >
                                      0
                                    </span>
                                  </div>
                                </div>
                                <div className="deal-countdown-timer">
                                  <div className="marketing-text">
                                    <span className="line-1">Hurry up!</span>
                                    <span className="line-2">
                                      Offers ends in:
                                    </span>
                                  </div>
                                  <span
                                    className="deal-time-diff"
                                    style={{ display: "none" }}
                                  >
                                    28800
                                  </span>
                                  <div className="deal-countdown countdown"></div>
                                </div>
                              </a>
                            </div>
                          </div>
                        ))} */}

                        {products.map((product) => (
                          <div className="embla__slide" key={product.id}>
                            <div className="sale-product-with-timer product">
                              <a
                                className="woocommerce-LoopProduct-link"
                                href="single-product-fullwidth.html"
                              >
                                <div className="sale-product-with-timer-header">
                                  <div className="price-and-title">
                                    <span className="price">
                                      <ins>
                                        <span className="woocommerce-Price-amount amount">
                                          <span className="woocommerce-Price-currencySymbol">
                                            $
                                          </span>
                                          {product.price}
                                        </span>
                                      </ins>
                                      <del>
                                        <span className="woocommerce-Price-amount amount">
                                          <span className="woocommerce-Price-currencySymbol">
                                            $
                                          </span>
                                          {product.originalPrice}
                                        </span>
                                      </del>
                                    </span>
                                    <h2 className="woocommerce-loop-product__title">
                                      {product.title}
                                    </h2>
                                  </div>
                                  <div className="sale-label-outer">
                                    <div className="sale-saved-label">
                                      <span className="saved-label-text">
                                        Save
                                      </span>
                                      <span className="saved-label-amount">
                                        <span className="woocommerce-Price-amount amount">
                                          <span className="woocommerce-Price-currencySymbol">
                                            $
                                          </span>
                                          {product.savedAmount}
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <Image
                                  width="224"
                                  height="197"
                                  alt={product.title}
                                  className="wp-post-image"
                                  src={product.imageUrl}
                                />
                                <div className="deal-progress">
                                  <div className="deal-stock">
                                    <div className="stock-sold">
                                      Already Sold: <strong>0</strong>
                                    </div>
                                    <div className="stock-available">
                                      Available: <strong>1000</strong>
                                    </div>
                                  </div>
                                  <div className="progress">
                                    <span
                                      style={{ width: "0%" }}
                                      className="progress-bar"
                                    >
                                      0
                                    </span>
                                  </div>
                                </div>
                                <div className="deal-countdown-timer">
                                  <div className="marketing-text">
                                    <span className="line-1">Hurry up!</span>
                                    <span className="line-2">
                                      Offers ends in:
                                    </span>
                                  </div>
                                  <span
                                    className="deal-time-diff"
                                    style={{ display: "none" }}
                                  >
                                    28800
                                  </span>
                                  <div className="deal-countdown countdown"></div>
                                </div>
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ///////////// */}

          <footer className="section-footer">
            <nav className="custom-slick-pagination">
              <a
                className="slider-prev left"
                href="#"
                data-target="#sale-with-timer-carousel .products"
              >
                <ChevronLeft></ChevronLeft>
                Previous deal
              </a>
              <a
                className="slider-next right"
                href="#"
                data-target="#sale-with-timer-carousel .products"
              >
                Next deal <ChevronRight></ChevronRight>
              </a>
            </nav>
          </footer>
        </div>
      </section>

      <section className="column-2 section-products-carousel-tabs tab-carousel-1">
        <div className="embla">
          <div className="embla__container">
            {/* Các item trong carousel của bạn */}
            <div className="embla__slide">Product 1</div>
            <div className="embla__slide">Product 2</div>
            <div className="embla__slide">Product 3</div>
          </div>
        </div>
      </section>
    </div>
  );
}
