"use client";
import { useShopContext } from "@/shared/contexts/ShopContext";
import usePrevNextButtons from "@/shared/hooks/EmblaCarouselArrowButtons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
interface Props {
  title?: string;
}
export default function LastedHeader({
  title = "Best of ratings",
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { emblaApi } = useShopContext();
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  return (
    <header className="section-header">
      <h2 className="section-title">{title}</h2>
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
