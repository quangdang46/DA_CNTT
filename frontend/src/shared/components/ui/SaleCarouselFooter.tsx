"use client";
import { useCarouselContext } from "@/shared/contexts/CarouselContext";
import usePrevNextButtons from "@/shared/hooks/EmblaCarouselArrowButtons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

export default function SaleCarouselFooter() {
  const { emblaApi } = useCarouselContext();

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  return (
    <footer className="section-footer">
      <nav className="custom-slick-pagination">
        <div
          className="slider-prev left"
          data-target="#sale-with-timer-carousel .products"
          onClick={onPrevButtonClick}
          aria-disabled={prevBtnDisabled}
        >
          <ChevronLeft strokeWidth={1} />
          Previous deal
        </div>
        <div
          className="slider-next right"
          data-target="#sale-with-timer-carousel .products"
          onClick={onNextButtonClick}
          aria-disabled={nextBtnDisabled}
        >
          Next deal <ChevronRight strokeWidth={1} />
        </div>
      </nav>
    </footer>
  );
}
