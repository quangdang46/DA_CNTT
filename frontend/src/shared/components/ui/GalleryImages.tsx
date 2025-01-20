// GalleryImages.tsx
"use client";
import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import styles from "@/shared/style/GalleryImages.module.css";
import { useGalleryContext } from "@/shared/contexts/GalleryContext";

const GalleryImages = () => {
  const { selectedIndex, setSelectedIndex, thumbnails } = useGalleryContext();
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true });

  const onSelect = useCallback(() => {
    if (!emblaMainApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    emblaMainApi.on("select", onSelect);
  }, [emblaMainApi, onSelect]);



  return (
    <div className="techmarket-single-product-gallery-images">
      <div className="woocommerce-product-gallery woocommerce-product-gallery--with-images woocommerce-product-gallery--columns-4 images">
        {/* <a href="#" className="woocommerce-product-gallery__trigger">
          🔍
        </a> */}
        <div className={styles.embla}>
          <div className={styles.embla__viewport} ref={emblaMainRef}>
            <figure
              className={`woocommerce-product-gallery__wrapper ${styles.embla__container}`}
            >
              {thumbnails.map((image_url, index) => (
                <div
                  key={index}
                  data-selected={selectedIndex === index}
                  className={`woocommerce-product-gallery__image ${styles.embla__slide}`}
                >
                  <div tabIndex={index === 0 ? 0 : -1}>
                    <Image
                      width={0}
                      height={0}
                      style={{
                        width: "600px",
                        height: "600px",
                        objectFit: "cover",
                      }} // optional
                      src={image_url}
                      className="attachment-shop_single size-shop_single wp-post-image"
                      alt=""
                    />
                  </div>
                </div>
              ))}
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryImages;
