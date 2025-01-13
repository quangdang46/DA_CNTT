"use client";
import React from "react";
import styles from "@/shared/style/RecommendedProductsList.module.css";
import ProductCard from "@/shared/components/ui/ProductCard";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { DotButton, useDotButton } from "@/shared/hooks/EmblaCarouselDotButton";
interface ProductProps {
  products: {
    title: string;
    price: number;
    originalPrice: number;
    savedAmount: number;
    imageUrl: string;
  }[];
}
export default function RecommendedProductsList({ products }: ProductProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true ,slidesToScroll: 3}, [Autoplay()]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={`products ${styles.embla__container}`}>
          {products &&
            products.map((product, index) => (
              <div className={styles.embla__slide} key={index}>
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      </div>
      <div className={`embla__dots`}>
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={`embla__dot ${
              index === selectedIndex ? "embla__dot__selected" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
