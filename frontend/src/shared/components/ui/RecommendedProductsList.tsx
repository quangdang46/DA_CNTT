"use client";
import React from "react";
import styles from "@/shared/style/RecommendedProductsList.module.css";
import ProductCard from "@/shared/components/ui/ProductCard";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useDotButton } from "@/shared/hooks/EmblaCarouselDotButton";
import DotCarousel from "@/shared/components/ui/Component/DotCarousel";
import { useParams } from "next/navigation";
import productApiRequest from "@/shared/apiRequests/product";
import { ProductListResType } from "@/shared/types/ProductTypes";

export default function RecommendedProductsList() {
  const { slug } = useParams(); // Lấy slug từ URL
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, slidesToScroll: 3 },
    [Autoplay()]
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const { data, isLoading, error } = slug
    ? productApiRequest.useProductsRelatedBySlug(slug as string)
    : productApiRequest.useProducts("best-seller");

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;
  const products = data?.data as ProductListResType;
  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={`products ${styles.embla__container}`}>
          {products &&
            products.length > 0 &&
            products.map((product, index) => (
              <div className={styles.embla__slide} key={index}>
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      </div>
      <DotCarousel
        scrollSnaps={scrollSnaps}
        selectedIndex={selectedIndex}
        onClick={onDotButtonClick}
      ></DotCarousel>
    </div>
  );
}
