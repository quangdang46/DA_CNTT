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
import useCompare from "@/shared/hooks/useCompare";
import { useCart } from "@/shared/hooks/useCart";
import Skeleton from "react-loading-skeleton";

export default function RecommendedProductsList() {
  const { slug } = useParams(); // Lấy slug từ URL
  const { handleAddToCart }=useCart();
  const { handleAddToCompare, CompareModal } = useCompare();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, slidesToScroll: 3 },
    [Autoplay()]
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const { data, isLoading, error } = slug
    ? productApiRequest.useProductsRelatedBySlug(slug as string)
    : productApiRequest.useProducts("best-seller");


  if (error) return <div>Error: {error.message}</div>;
  const products = data?.data as ProductListResType;
  return (
    <>
      <CompareModal></CompareModal>
      <div className={styles.embla}>
        <div className={styles.embla__viewport} ref={emblaRef}>
          <div className={`products ${styles.embla__container}`}>
            {/* {products &&
              products.length > 0 &&
              products.map((product, index) => (
                <div className={styles.embla__slide} key={index}>
                  <ProductCard
                    product={product}
                    onAddToCompare={handleAddToCompare}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ))} */}

            {isLoading
              ? Array.from({ length: 7 }).map((_, index) => (
                  <div className={styles.embla__slide} key={index}>
                    <Skeleton height={180} />
                    <Skeleton height={30} width="50%" />
                    <Skeleton height={20} width="80%" />
                  </div>
                ))
              : products?.map((product, index) => (
                  <div className={styles.embla__slide} key={index}>
                    <ProductCard
                      product={product}
                      onAddToCompare={handleAddToCompare}
                      onAddToCart={handleAddToCart}
                    />
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
    </>
  );
}
