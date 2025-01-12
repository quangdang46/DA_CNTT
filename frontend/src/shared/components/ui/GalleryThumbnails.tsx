// GalleryThumbnails.tsx
"use client";
import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import styles from "@/shared/style/GalleryThumbnails.module.css";
import { useGalleryContext } from "@/shared/contexts/GalleryContext";
import clsx from "clsx";
import usePrevNextButtons from "@/shared/hooks/EmblaCarouselArrowButtons";
import ChevronDown from "@/shared/components/icons/ChevronDown";
import ChevronUp from "@/shared/components/icons/ChevronUp";
const GalleryThumbnails = () => {
  const { selectedIndex, setSelectedIndex, thumbnails } = useGalleryContext();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    axis: "y",
  });

  const onThumbClick = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      if (emblaThumbsApi) emblaThumbsApi.scrollTo(index);
    },
    [setSelectedIndex, emblaThumbsApi]
  );
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaThumbsApi);
  return (
    <div className="techmarket-single-product-gallery-thumbnails">
      <div className={styles.embla__thumbs}>
        <div
          className={`${styles.embla__thumbs__button} ${styles.embla__thumbs__button__prev}`}
          onClick={onPrevButtonClick}
          aria-disabled={prevBtnDisabled}
        >
          <ChevronUp></ChevronUp>
        </div>
        <div className={styles.embla__thumbs__viewport} ref={emblaThumbsRef}>
          <figure
            className={`techmarket-single-product-gallery-thumbnails__wrapper ${styles.embla__thumbs__container}`}
          >
            {thumbnails.map((thumb, index) => (
              <figure
                key={index}
                data-thumb={thumb}
                className={clsx(
                  "techmarket-wc-product-gallery__image",
                  styles.embla__thumbs__slide,
                  {
                    [styles.embla__thumbs__slide__selected]:
                      selectedIndex === index,
                  }
                )}
                onClick={() => onThumbClick(index)}
              >
                <Image
                  width="180"
                  height="180"
                  src={thumb}
                  className="attachment-shop_thumbnail size-shop_thumbnail wp-post-image"
                  alt=""
                />
              </figure>
            ))}
          </figure>
        </div>
        <div
          className={`${styles.embla__thumbs__button} ${styles.embla__thumbs__button__next}`}
          onClick={onNextButtonClick}
          aria-disabled={nextBtnDisabled}
        >
          <ChevronDown></ChevronDown>
        </div>
      </div>
    </div>
  );
};

export default GalleryThumbnails;
