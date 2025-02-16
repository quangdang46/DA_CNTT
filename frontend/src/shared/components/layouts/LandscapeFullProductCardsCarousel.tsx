"use client";
import ProductCardLandscape from "@/shared/components/ui/ProductCardLandscape";
import React from "react";
import styles from "@/shared/style/LandscapeFullProductCardsCarousel.module.css";
import useEmblaCarousel from "embla-carousel-react";
import { useDotButton } from "@/shared/hooks/EmblaCarouselDotButton";
import DotCarousel from "@/shared/components/ui/Component/DotCarousel";
import productApiRequest from "@/shared/apiRequests/product";
import useCompare from "@/shared/hooks/useCompare";
import { useCart } from "@/shared/hooks/useCart";
import Skeleton from "react-loading-skeleton";
export default function LandscapeFullProductCardsCarousel() {
  const { handleAddToCompare, CompareModal } = useCompare();
  const { handleAddToCart }=useCart();
  const [emblaRef, emblaApi] = useEmblaCarousel({});

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const { data, isLoading, error } = productApiRequest.useProductList();

  if (error) return <div>Error: {error.message}</div>;

  const products = data?.data || [];

  const itemsPerPage = 4; // 2 phần tử/hàng x 2 hàng
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Chia danh sách thành các trang
  const paginatedItems = Array.from({ length: totalPages }, (_, i) =>
    products.slice(i * itemsPerPage, (i + 1) * itemsPerPage)
  );
  return (
    <>
      <CompareModal></CompareModal>
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
              <strong>Khám phá công nghệ</strong> di động mới nhất
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
                          {isLoading
                            ? [...Array(2)].map((_, pageIndex) => (
                                <div
                                  className={styles.embla__slide}
                                  key={pageIndex}
                                >
                                  <div
                                    style={{
                                      display: "grid",
                                      gridTemplateColumns: "repeat(2, 1fr)",
                                      gridTemplateRows: "repeat(2, 1fr)",
                                      gap: "10px",
                                    }}
                                  >
                                    {[...Array(4)].map((_, index) => (
                                      <div key={index}>
                                        <Skeleton
                                          height={120}
                                          borderRadius={8}
                                        />
                                        <Skeleton
                                          width="80%"
                                          height={20}
                                          style={{ marginTop: 10 }}
                                        />
                                        <Skeleton width="60%" height={18} />
                                        <Skeleton width="40%" height={16} />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))
                            : paginatedItems.map(
                                (productPerPage, pageIndex) => (
                                  <div
                                    className={styles.embla__slide}
                                    key={pageIndex}
                                  >
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
                                          onAddToCompare={handleAddToCompare}
                                          onAddToCart={handleAddToCart}
                                        ></ProductCardLandscape>
                                      ))}
                                    </div>
                                  </div>
                                )
                              )}
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
    </>
  );
}
