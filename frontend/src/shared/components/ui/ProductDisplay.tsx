import ProductCardLandscape from "@/shared/components/ui/ProductCardLandscape";
import useEmblaCarousel from "embla-carousel-react";
import React, { useEffect, useState } from "react";
import styles from "@/shared/style/ProductDisplay.module.css";
import ChevronLeft from "@/shared/components/icons/ChevronLeft";
import ChevronRight from "@/shared/components/icons/ChevronRight";
import usePrevNextButtons from "@/shared/hooks/EmblaCarouselArrowButtons";
import DotCarousel from "@/shared/components/ui/DotCarousel";
import { useDotButton } from "@/shared/hooks/EmblaCarouselDotButton";
import productApiRequest from "@/shared/apiRequests/product";
import { ResType } from "@/shared/types/resType";
import { ProductListResType } from "@/shared/types/ProductTypes";

export default function ProductDisplay({
  title = "Related products",
}: {
  title: string | null;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 2,
    loop: true,
  });
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const [products, setProducts] = useState<ProductListResType | null>(null);;
  useEffect(() => {
    const fetchProducts = async () => {
      const response:ResType<ProductListResType> = await productApiRequest.getList();
      if (response.success) {
        setProducts(response.data);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section
      className="section-landscape-products-carousel 4-column-landscape-carousel"
      id="landscape-products-carousel"
    >
      <header className="section-header">
        <h2 className="section-title">{title}</h2>
        <nav className="custom-slick-nav">
          <div className={styles.embla__buttons}>
            <button
              className={`${styles.embla__button} ${styles.embla__button__prev}`}
              onClick={onPrevButtonClick}
              aria-disabled={prevBtnDisabled}
            >
              <ChevronLeft className={styles.embla__button__svg}></ChevronLeft>
            </button>
            <button
              className={`${styles.embla__button} ${styles.embla__button__next}`}
              onClick={onNextButtonClick}
              aria-disabled={nextBtnDisabled}
            >
              <ChevronRight></ChevronRight>
            </button>
          </div>
        </nav>
      </header>
      <div className="products-carousel">
        <div className="container-fluid">
          <div className="woocommerce columns-5">
            <div className={styles.embla}>
              <div className={styles.embla__viewport} ref={emblaRef}>
                <div className={`products ${styles.embla__container}`}>
                  {/* list */}
                  {products &&
                    products.length > 0 &&
                    products.map((product, index) => (
                      <div className={styles.embla__slide} key={index}>
                        <ProductCardLandscape
                          product={product}
                        ></ProductCardLandscape>
                      </div>
                    ))}
                </div>
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
    </section>
  );
}
