"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { ProductListResType } from "@/shared/types/ProductTypes";
import { ResType } from "@/shared/types/resType";
import productApiRequest from "@/shared/apiRequests/product";

export default function HomePageSlider() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  
  const [products, setProducts] = useState<ProductListResType | []>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response: ResType<ProductListResType> =
        await productApiRequest.getByUrlAndType({
          url: "/products/byType",
          type: "new",
        });
      if (response.success) {
        setProducts(response.data);
      }
    };
    fetchProducts();
  }, []);
  const slides = products.map((product) => ({
    backgroundImage: "/static/images/slider/background.jpg",
    image: product.images[0].image_url,
    caption: {
      title: product.name,
      subTitle: product.description,
      button: "Get Yours now",
      bottomCaption: "Free shipping on US Terority",
      slugProduct: product.slug,
    },
    className: "slider-1 slick-slide",
  }));

  return (
    <div className="home-v1-slider home-slider" role="toolbar">
      <div className="slick-list draggable" ref={emblaRef}>
        <div
          className="slick-track"
          style={{
            display: "flex",
            transition: "transform 300ms ease",
          }}
        >
          <>
            {slides.map((slide, index) => (
              <div
                key={index}
                className={slide.className}
                style={{
                  backgroundImage: `url('${slide.backgroundImage}')`,
                  minWidth: "100%",
                  position: "relative",
                }}
              >
                <Image
                  src={slide.image}
                  alt=""
                  width={0}
                  height={0}
                  style={{
                    objectFit: "cover",
                    position: "absolute",
                    height: "100%",
                    width: "30%",
                    top: 0,
                    right: 0,
                    bottom: 0,
                  }}
                />
                <div className="caption">
                  <div className="title hidden">{slide.caption.title}</div>
                  <div className="sub-title hidden">
                    {slide.caption.subTitle}
                  </div>
                  <a
                    className="button hidden"
                    href={`/details/${slide.caption.slugProduct}`}
                  >
                    {slide.caption.button}{" "}
                    <i className="tm tm-long-arrow-right"></i>
                  </a>
                  <div className="bottom-caption hidden">
                    {slide.caption.bottomCaption}
                  </div>
                </div>
              </div>
            ))}
          </>
        </div>
      </div>
    </div>
  );
}
