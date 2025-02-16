import { useCarouselContext } from "@/shared/contexts/CarouselContext";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, { useEffect } from "react";
import styles from "@/shared/style/SaleProductsCarousel.module.css";
import productApiRequest from "@/shared/apiRequests/product";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

export default function SaleProductsCarousel() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const { setEmblaApi } = useCarouselContext();

  // Chỉ cần gọi useEffect sau khi emblaApi có giá trị
  useEffect(() => {
    if (emblaApi) {
      setEmblaApi(emblaApi); // Thiết lập emblaApi vào context
    }
  }, [emblaApi, setEmblaApi]); // Đảm bảo chỉ gọi khi emblaApi thay đổi

  //   if (!emblaApi) return null; // Nếu emblaApi chưa có, không render carousel

  const { data, isLoading, error } =
    productApiRequest.useProducts("high-rated");



  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const products = data?.data || [];

  return (
    <div className="sale-products-with-timer-carousel deals-carousel-v1">
      <div className="products-carousel">
        <div className="container-fluid">
          <div className="woocommerce columns-1">
            <div className={styles.embla}>
              <div className={styles.embla__viewport} ref={emblaRef}>
                <div className={`${styles.embla__container} products`}>
                  {isLoading
                    ? // Hiển thị Skeleton khi đang tải
                      Array.from({ length: 5 }).map((_, index) => (
                        <div className={styles.embla__slide} key={index}>
                          <div className="sale-product-with-timer product">
                            <Skeleton height={30} width="50%" />
                            <Skeleton height={20} width="80%" />
                            <Skeleton height={150} />
                            <Skeleton height={20} width="60%" />
                            <Skeleton height={10} width="40%" />
                          </div>
                        </div>
                      ))
                    : // Hiển thị sản phẩm khi có dữ liệu
                      products.map((product, index) => (
                        <div className={styles.embla__slide} key={index}>
                          <div className="sale-product-with-timer product">
                            <Link
                              className="woocommerce-LoopProduct-link"
                              href={`/details/${product.slug}`}
                            >
                              <div className="sale-product-with-timer-header">
                                <div className="price-and-title">
                                  <span className="price">
                                    <ins>
                                      <span className="woocommerce-Price-amount amount">
                                        {Math.round(product.price)} VNĐ
                                      </span>
                                    </ins>
                                    <del>
                                      <span className="woocommerce-Price-amount amount">
                                        {Math.round(product.price * 2)}
                                      </span>
                                    </del>
                                  </span>
                                  <h2 className="woocommerce-loop-product__title">
                                    {product.name}
                                  </h2>
                                </div>
                                <div className="sale-label-outer">
                                  <div className="sale-saved-label">
                                    <span className="saved-label-text">
                                      Save
                                    </span>
                                    <span className="saved-label-amount">
                                      {Math.round(product.price * 0.1)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <Image
                                width="224"
                                height="197"
                                alt=" "
                                className="wp-post-image"
                                src={product.images[0].image_url}
                              />
                            </Link>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
