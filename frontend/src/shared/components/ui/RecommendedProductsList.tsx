"use client";
import React from "react";
import styles from "@/shared/style/RecommendedProductsList.module.css";
import ProductCard from "@/shared/components/ui/ProductCard";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useDotButton } from "@/shared/hooks/EmblaCarouselDotButton";
import DotCarousel from "@/shared/components/ui/DotCarousel";

export default function RecommendedProductsList() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, slidesToScroll: 3 },
    [Autoplay()]
  );
  
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={`products ${styles.embla__container}`}>
          {/* {products &&
            products.map((product, index) => (
              <div className={styles.embla__slide} key={index}>
                <ProductCard product={product} />
              </div>
            ))} */}
        </div>
      </div>
      <DotCarousel
        scrollSnaps={scrollSnaps}
        selectedIndex={selectedIndex}
        onClick={onDotButtonClick}
      ></DotCarousel>
    </div>
  );
}
