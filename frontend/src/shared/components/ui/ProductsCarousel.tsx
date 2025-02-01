"use client";
import React from "react";
import styles from "@/shared/style/ProductsCarousel.module.css";
import { useDotButton } from "@/shared/hooks/EmblaCarouselDotButton";
import ProductCard from "@/shared/components/ui/ProductCard";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import DotCarousel from "@/shared/components/ui/Component/DotCarousel";
import { ProductListResType } from "@/shared/types/ProductTypes";
import useCompare from "@/shared/hooks/useCompare";
import { useCart } from "@/shared/hooks/useCart";
interface ProductsCarouselProps {
  products: ProductListResType;
}

export default function ProductsCarousel({ products }: ProductsCarouselProps) {
  const { handleAddToCompare, CompareModal } = useCompare();
  const { handleAddToCart } = useCart();
  //   duplicate products
  const itemsPerPage = 10; // 5 phần tử/hàng x 2 hàng
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Chia danh sách thành các trang
  const paginatedItems = Array.from({ length: totalPages }, (_, i) =>
    products.slice(i * itemsPerPage, (i + 1) * itemsPerPage)
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
    <>
      <CompareModal></CompareModal>
      <div className="tab-content">
        <div
          id="tab-59f89f0881f930"
          className="tab-pane active"
          role="tabpanel"
        >
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
                            {productPerPage &&
                              productPerPage.length > 0 &&
                              productPerPage.map((product, index) => (
                                <ProductCard
                                  product={product}
                                  key={index}
                                  onAddToCompare={handleAddToCompare}
                                  onAddToCart={handleAddToCart}
                                ></ProductCard>
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
    </>
  );
}
