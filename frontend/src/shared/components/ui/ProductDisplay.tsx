import ProductCardLandscape from "@/shared/components/ui/ProductCardLandscape";
import { Product } from "@/shared/types/ProductTypes";
import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import styles from "@/shared/style/ProductDisplay.module.css";
import ChevronLeft from "@/shared/components/icons/ChevronLeft";
import ChevronRight from "@/shared/components/icons/ChevronRight";
import usePrevNextButtons from "@/shared/hooks/EmblaCarouselArrowButtons";

export default function ProductDisplay({
  title = "Related products",
  products,
}: {
  title: string | null;
  products: Product[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({});

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
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
                  {products &&
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
          </div>
        </div>
      </div>
    </section>
  );
}
