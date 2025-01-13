import { DotButton } from "@/shared/hooks/EmblaCarouselDotButton";
import React from "react";
interface DotCarousel {
  onClick: (index: number) => void;
  scrollSnaps: number[];
  selectedIndex: number;
}

export default function DotCarousel({
  onClick,
  scrollSnaps,
  selectedIndex,
}: DotCarousel) {
  return (
    <div className={`embla__dots`}>
      {scrollSnaps.map((_, index) => (
        <DotButton
          key={index}
          onClick={() => onClick(index)}
          className={`embla__dot ${
            index === selectedIndex ? "embla__dot__selected" : ""
          }`}
        />
      ))}
    </div>
  );
}
