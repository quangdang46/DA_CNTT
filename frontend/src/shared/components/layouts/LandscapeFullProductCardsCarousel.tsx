"use client";
import ProductCardLandscape from "@/shared/components/ui/ProductCardLandscape";
import { RootState } from "@/shared/state/store";
import React from "react";
import { useSelector } from "react-redux";
import styles from "@/shared/style/LandscapeFullProductCardsCarousel.module.css";
import useEmblaCarousel from "embla-carousel-react";
import { useDotButton } from "@/shared/hooks/EmblaCarouselDotButton";
import DotCarousel from "@/shared/components/ui/DotCarousel";
export default function LandscapeFullProductCardsCarousel() {
  const products = useSelector((state: RootState) => state.products.products);
  const [emblaRef, emblaApi] = useEmblaCarousel({});

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const itemsPerPage = 4; // 2 phần tử/hàng x 2 hàng
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Chia danh sách thành các trang
  const paginatedItems = Array.from({ length: totalPages }, (_, i) =>
    products.slice(i * itemsPerPage, (i + 1) * itemsPerPage)
  );
  return (
    <section
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1694590000075-8ece6e2a2fc5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        height: "853px",
      }}
      className="section-landscape-full-product-cards-carousel"
    >
      <div className="col-full">
        <header className="section-header">
          <h2 className="section-title">
            <strong>Power Audio &amp; Visual </strong>entertainment
          </h2>
        </header>
        <div className="row">
          <div className="landscape-full-product-cards-carousel">
            <div className="products-carousel">
              <div className="container-fluid">
                <div className="woocommerce columns-2">
                  <div className={styles.embla}>
                    <div className={styles.embla__viewport} ref={emblaRef}>
                      <div className={`products ${styles.embla__container}`}>
                        {paginatedItems.map((productPerPage, pageIndex) => (
                          <div className={styles.embla__slide} key={pageIndex}>
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)", // 2 phần tử mỗi hàng
                                gridTemplateRows: "repeat(2, 1fr)", // 2 hàng
                              }}
                            >
                              {productPerPage.map((product, index) => (
                                <ProductCardLandscape
                                  product={product}
                                  version={2}
                                  key={index}
                                ></ProductCardLandscape>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <DotCarousel
                      scrollSnaps={scrollSnaps}
                      selectedIndex={selectedIndex}
                      onClick={onDotButtonClick}
                    ></DotCarousel>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
