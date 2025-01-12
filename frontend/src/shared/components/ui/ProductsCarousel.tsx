"use client";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React from "react";
import styles from "@/shared/style/ProductsCarousel.module.css";
import { DotButton, useDotButton } from "@/shared/hooks/EmblaCarouselDotButton";
import Autoplay from "embla-carousel-autoplay";
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
  //   duplicate products
  const duplicatedProducts = [...products, ...products, ...products];
  const itemsPerPage = 10; // 5 phần tử/hàng x 2 hàng
  const totalPages = Math.ceil(duplicatedProducts.length / itemsPerPage);

  // Chia danh sách thành các trang
  const paginatedItems = Array.from({ length: totalPages }, (_, i) =>
    duplicatedProducts.slice(i * itemsPerPage, (i + 1) * itemsPerPage)
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      slidesToScroll: 1, // Scroll theo từng trang
      loop: false,
    },
    [Autoplay()]
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
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
                    {paginatedItems.map((productPerPage, pageIndex) => (
                      <div className={styles.embla__slide} key={pageIndex}>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(5, 1fr)", // 5 phần tử trên mỗi hàng
                            gap: "10px",
                          }}
                        >
                          {productPerPage.map((product, index) => (
                            <div className={`product`} key={index}>
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
                                  <span className="amount">
                                    {product.price}
                                  </span>
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
                    ))}
                  </div>
                </div>
                <div className={`${styles.embla__dots}`}>
                  {scrollSnaps.map((_, index) => (
                    <DotButton
                      key={index}
                      onClick={() => onDotButtonClick(index)}
                      // className={"embla__dot".concat(
                      //   index === selectedIndex ? " embla__dot--selected" : ""
                      // )}

                      className={`${styles.embla__dot} ${
                        index === selectedIndex
                          ? styles.embla__dot__selected
                          : ""
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
