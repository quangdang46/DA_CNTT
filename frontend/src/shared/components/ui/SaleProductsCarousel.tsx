import { useCarouselContext } from "@/shared/contexts/CarouselContext";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "@/shared/style/SaleProductsCarousel.module.css";
import { ResType } from "@/shared/types/resType";
import { ProductListResType } from "@/shared/types/ProductTypes";
import productApiRequest from "@/shared/apiRequests/product";

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

  const [products, setProducts] = useState<ProductListResType | []>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response: ResType<ProductListResType> =
        await productApiRequest.getByUrlAndType({
          url: "/products/byType",
          type: "high-rated",
        });
      if (response.success) {
        setProducts(response.data);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="sale-products-with-timer-carousel deals-carousel-v1">
      <div className="products-carousel">
        <div className="container-fluid">
          <div className="woocommerce columns-1">
            <div className={styles.embla}>
              <div className={styles.embla__viewport} ref={emblaRef}>
                <div className={`${styles.embla__container} products`}>
                  {products &&
                    products.length > 0 &&
                    products.map((product, index) => (
                      <div className={styles.embla__slide} key={index}>
                        <div className="sale-product-with-timer product">
                          <a
                            className="woocommerce-LoopProduct-link"
                            href="single-product-fullwidth.html"
                          >
                            <div className="sale-product-with-timer-header">
                              <div className="price-and-title">
                                <span className="price">
                                  <ins>
                                    <span className="woocommerce-Price-amount amount">
                                      <span className="woocommerce-Price-currencySymbol">
                                        $
                                      </span>
                                      {product.price}
                                    </span>
                                  </ins>
                                  <del>
                                    <span className="woocommerce-Price-amount amount">
                                      <span className="woocommerce-Price-currencySymbol">
                                        $
                                      </span>
                                      {product.price * 1.1}
                                    </span>
                                  </del>
                                </span>
                                <h2 className="woocommerce-loop-product__title">
                                  {product.name}
                                </h2>
                              </div>
                              <div className="sale-label-outer">
                                <div className="sale-saved-label">
                                  <span className="saved-label-text">Save</span>
                                  <span className="saved-label-amount">
                                    <span className="woocommerce-Price-amount amount">
                                      <span className="woocommerce-Price-currencySymbol">
                                        $
                                      </span>
                                      {(product.price * 0.1).toFixed(2)}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Image
                              width="224"
                              height="197"
                              alt={" "}
                              className="wp-post-image"
                              src={product.images[0].image_url}
                            />
                            <div className="deal-progress">
                              <div className="deal-stock">
                                <div className="stock-sold">
                                  Already Sold: <strong>0</strong>
                                </div>
                                <div className="stock-available">
                                  Available: <strong>1000</strong>
                                </div>
                              </div>
                              <div className="progress">
                                <span
                                  style={{ width: "10%" }}
                                  className="progress-bar"
                                >
                                  0
                                </span>
                              </div>
                            </div>
                            <div className="deal-countdown-timer">
                              <div className="marketing-text">
                                <span className="line-1">Hurry up!</span>
                                <span className="line-2">Offers ends in:</span>
                              </div>
                              <span
                                className="deal-time-diff"
                                style={{ display: "none" }}
                              >
                                28800
                              </span>
                              <div className="deal-countdown countdown"></div>
                            </div>
                          </a>
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
