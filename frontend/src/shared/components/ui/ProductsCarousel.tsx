"use client";
import { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import styles from "@/shared/style/ProductsCarousel.module.css";
interface DealsCarouselProps {
  products: {
    title: string;
    price: number;
    originalPrice: number;
    savedAmount: number;
    imageUrl: string;
  }[];
}
export default function ProductsCarousel({ products }: DealsCarouselProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );
  // Hàm này chạy khi người dùng tương tác
  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);
 
  //   duplicate products
  const duplicatedProducts = [...products, ...products, ...products];

  return (
    <div className="tab-content">
      <div id="tab-59f89f0881f930" className="tab-pane active" role="tabpanel">
        <div
          className="products-carousel"
          data-ride="tm-slick-carousel"
          data-wrap=".products"
        >
          <div className="container-fluid">
            <div className="woocommerce">
              <div className={styles.embla}>
                <div className={styles.embla__viewport} ref={emblaRef}>
                  <div className={`products ${styles.embla__container}`}>
                    {duplicatedProducts.map((product, index) => (
                      <div
                        className={`product ${styles.embla__slide}`}
                        key={index}
                      >
                        <div className="yith-wcwl-add-to-wishlist">
                          <a
                            href="wishlist.html"
                            rel="nofollow"
                            className="add_to_wishlist"
                          >
                            Add to Wishlist
                          </a>
                        </div>
                        <a
                          href="single-product-fullwidth.html"
                          className="woocommerce-LoopProduct-link"
                        >
                          <Image
                            src={product.imageUrl}
                            alt={product.title}
                            width={224}
                            height={130}
                            className="wp-post-image"
                          />
                          <span className="price">
                            <ins>
                              <span className="amount"></span>
                            </ins>
                            <span className="amount">{product.price}</span>
                          </span>
                          <h2 className="woocommerce-loop-product__title">
                            {product.title}
                          </h2>
                        </a>
                        <div className="hover-area">
                          <a
                            className="button add_to_cart_button"
                            href="cart.html"
                            rel="nofollow"
                          >
                            Add to cart
                          </a>
                          <a
                            className="add-to-compare-link"
                            href="compare.html"
                          >
                            Add to compare
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <ul className="slick-dots" role="tablist">
                  {scrollSnaps.map((_, index) => (
                    <li
                      key={index}
                      className={index === selectedIndex ? "slick-active" : ""}
                      aria-hidden="false"
                      role="presentation"
                      aria-controls={`navigation${index}`}
                      id={`slick-slide${index}`}
                    >
                      <button
                        type="button"
                        data-role="none"
                        role="button"
                        tabIndex={0}
                        onClick={() => onDotButtonClick(index)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
