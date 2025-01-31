"use client";
import productApiRequest from "@/shared/apiRequests/product";
import { Product } from "@/shared/types/ProductTypes";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Star, StarHalf } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import styles from "@/shared/style/LatestProductsCarousel.module.css";
import Link from "next/link";
import { useShopContext } from "@/shared/contexts/ShopContext";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="landscape-product-widget product">
      <Link
        className="woocommerce-LoopProduct-link"
        href={`/product/${product.slug}`}
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
                <span className="amount">${product.price}</span>
              </ins>
              <del>
                <span className="amount">${product.price * 2}</span>
              </del>
            </span>
            <h2 className="woocommerce-loop-product__title">{product.name}</h2>
            <div className="techmarket-product-rating">
              {Array(Math.floor(product.rating))
                .fill(0)
                .map((_, i) => (
                  <Star strokeWidth={1} key={`full-${i}`} />
                ))}
              {product.rating % 1 !== 0 && (
                <StarHalf strokeWidth={1} key="half-star" />
              )}
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
                    {group.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
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
