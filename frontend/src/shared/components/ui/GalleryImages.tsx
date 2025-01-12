// GalleryImages.tsx
"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import styles from "@/shared/style/GalleryImages.module.css";
import { useGalleryContext } from "@/shared/contexts/GalleryContext";

const GalleryImages = () => {
  const { selectedIndex, setSelectedIndex, setThumbnails } =
    useGalleryContext();
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true });

  const onSelect = useCallback(() => {
    if (!emblaMainApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    emblaMainApi.on("select", onSelect);
  }, [emblaMainApi, onSelect]);

  const images = useMemo(
    () => [
      {
        big: "https://images.unsplash.com/photo-1719937051157-d3d81cc28e86?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumb:
          "https://images.unsplash.com/photo-1721333090404-0261606d2c73?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        big: "https://images.unsplash.com/photo-1720048171098-dba33b2c4806?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumb:
          "https://images.unsplash.com/photo-1719937050640-71cfd3d851be?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        big: "https://images.unsplash.com/photo-1719937050640-71cfd3d851be?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumb:
          "https://images.unsplash.com/photo-1719937051157-d3d81cc28e86?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        big: "https://images.unsplash.com/photo-1721333090404-0261606d2c73?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumb:
          "https://images.unsplash.com/photo-1720048171098-dba33b2c4806?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        big: "https://images.unsplash.com/photo-1721333090404-0261606d2c73?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumb:
          "https://images.unsplash.com/photo-1720048171098-dba33b2c4806?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        big: "https://images.unsplash.com/photo-1721333090404-0261606d2c73?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumb:
          "https://images.unsplash.com/photo-1720048171098-dba33b2c4806?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        big: "https://images.unsplash.com/photo-1721333090404-0261606d2c73?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumb:
          "https://images.unsplash.com/photo-1720048171098-dba33b2c4806?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        big: "https://images.unsplash.com/photo-1721333090404-0261606d2c73?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumb:
          "https://images.unsplash.com/photo-1720048171098-dba33b2c4806?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    []
  );
  // Cập nhật thumbnails từ dữ liệu động
  useEffect(() => {
    const thumbnails = images.map((image) => image.thumb);
    setThumbnails(thumbnails);
  }, [images, setThumbnails]);

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
              {images.map((image, index) => (
                <div
                  key={index}
                  data-selected={selectedIndex === index}
                  className={`woocommerce-product-gallery__image ${styles.embla__slide}`}
                >
                  <div tabIndex={index === 0 ? 0 : -1}>
                    <Image
                      width="600"
                      height="600"
                      src={image.big}
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
