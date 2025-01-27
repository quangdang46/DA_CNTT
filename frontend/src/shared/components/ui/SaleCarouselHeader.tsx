"use client";
import { useCarouselContext } from "@/shared/contexts/CarouselContext";
import usePrevNextButtons from "@/shared/hooks/EmblaCarouselArrowButtons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

export default function SaleCarouselHeader() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { emblaApi } = useCarouselContext();
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  return (
    <header className="section-header">
      <h2 className="section-title">
        <strong>Best</strong> of ratings
      </h2>
      <div className="custom-slick-nav">
        <div
          className="slick-arrow"
          onClick={onPrevButtonClick}
          aria-disabled={prevBtnDisabled}
        >
          <ChevronLeft strokeWidth={1} />
        </div>
        <div
          className="slick-arrow"
          onClick={onNextButtonClick}
          aria-disabled={nextBtnDisabled}
        >
          <ChevronRight strokeWidth={1} />
        </div>
      </div>
    </header>
  );
}
