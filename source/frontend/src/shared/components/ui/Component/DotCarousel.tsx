import React from "react";
interface DotCarousel {
  onClick: (index: number) => void;
  scrollSnaps: number[];
  selectedIndex: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function DotCarousel({
  onClick,
  scrollSnaps,
  selectedIndex,
  style,
}: DotCarousel) {
  return (
    // <div className={`embla__dots`}>
    //   {scrollSnaps.map((_, index) => (
    //     <DotButton
    //       key={index}
    //       onClick={() => onClick(index)}
    //       className={`embla__dot ${
    //         index === selectedIndex ? "embla__dot__selected" : ""
    //       }`}
    //     />
    //   ))}
    // </div>

    <ul className="embla__dots" style={style}>
      {scrollSnaps.map((_, index) => (
        <li
          key={index}
          className={`embla__dot ${
            index === selectedIndex ? "embla__dot__selected" : ""
          }`}
          onClick={() => onClick(index)}
        >
          <button className="embla__dot__button">{index + 1}</button>
        </li>
      ))}
    </ul>
  );
}
