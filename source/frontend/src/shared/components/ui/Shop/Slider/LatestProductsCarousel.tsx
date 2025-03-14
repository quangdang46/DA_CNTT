"use client";
import productApiRequest from "@/shared/apiRequests/product";
import { Product } from "@/shared/types/ProductTypes";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, { useEffect } from "react";
import styles from "@/shared/style/LatestProductsCarousel.module.css";
import Link from "next/link";
import { useShopContext } from "@/shared/contexts/ShopContext";
import { RatingStars } from "@/shared/components/ui/RatingStars";
import Skeleton from "react-loading-skeleton";
interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="landscape-product-widget product">
      <Link
        className="woocommerce-LoopProduct-link"
        href={`/details/${product.slug}`}
      >
        <div className="media">
          <Image
            className="wp-post-image"
            width={300}
            height={300}
            src={product.images[0].image_url}
            alt={product.name}
          />
          <div className="media-body">
            <span className="price">
              <ins>
                <span className="amount">{Math.round(product.price)} VNĐ</span>
              </ins>
              <del>
                <span className="amount">
                  {Math.round(product.price * 2)}
                </span>
              </del>
            </span>
            <h2 className="woocommerce-loop-product__title">{product.name}</h2>
            <div className="techmarket-product-rating">
              <RatingStars rating={product.rating}></RatingStars>

              <span className="review-count">({product.review_count})</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function LatestProductsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const { setEmblaApi } = useShopContext();

  // Set emblaApi to context when it's available
  useEffect(() => {
    if (emblaApi) {
      setEmblaApi(emblaApi);
    }
  }, [emblaApi, setEmblaApi]);

  const { data, isLoading, error } = productApiRequest.useProducts("new");

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || !data.data) {
    return <div>No products found.</div>;
  }

  const products = data.data;
  const groupedProducts = [];
  for (let i = 0; i < products.length; i += 3) {
    groupedProducts.push(products.slice(i, i + 3));
  }
  return (
    <div className="products-carousel">
      <div className="container-fluid">
        <div className="woocommerce columns-1">
          <div className={styles.embla}>
            <div className={styles.embla__viewport} ref={emblaRef}>
              <div className={`${styles.embla__container} products`}>
                {/* {products.map((product) => (
                  <div className={styles.embla__slide} key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))} */}

                {groupedProducts.map((group, index) => (
                  <div className={styles.embla__slide} key={index}>
                    {group.map((product) =>
                      // <ProductCard key={product.id} product={product} />
                      isLoading ? (
                        <div
                          key={product.id}
                          className="landscape-product-widget product"
                        >
                          <Skeleton height={300} />
                          <div className="media-body">
                            <Skeleton width="60%" height={20} />
                            <Skeleton width="80%" height={30} />
                            <Skeleton width="40%" height={20} />
                            <Skeleton width="50%" height={20} />
                          </div>
                        </div>
                      ) : (
                        <ProductCard key={product.id} product={product} />
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
