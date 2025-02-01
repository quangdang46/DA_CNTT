"use client";
import BrandItem from "@/shared/components/ui/BrandItem";
import usePrevNextButtons from "@/shared/hooks/EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import styles from "@/shared/style/BrandsCarousel.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
export default function BrandsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  return (
    <section className="brands-carousel">
      <div className="col-full d-flex">
        <div
          className={styles.embla__prev}
          onClick={onPrevButtonClick}
          aria-disabled={prevBtnDisabled}
        >
          <ChevronLeft strokeWidth={1} size={30} />
        </div>
        <div className={styles.embla}>
          <div className={styles.embla__viewport} ref={emblaRef}>
            <div className={`brands ${styles.embla__container}`}>
              {Array.from({ length: 30 }).map((_, index) => (
                <BrandItem key={index}></BrandItem>
              ))}
            </div>
          </div>
        </div>
        <div
          className={styles.embla__next}
          onClick={onNextButtonClick}
          aria-disabled={nextBtnDisabled}
        >
          <ChevronRight strokeWidth={1} size={30} />
        </div>
      </div>
    </section>
  );
}
