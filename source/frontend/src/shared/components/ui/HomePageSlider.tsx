"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import productApiRequest from "@/shared/apiRequests/product";
import DotCarousel from "@/shared/components/ui/Component/DotCarousel";
import { useDotButton } from "@/shared/hooks/EmblaCarouselDotButton";
import { MoveRight } from "lucide-react";
import Skeleton from "react-loading-skeleton";

export default function HomePageSlider() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const { data, isLoading, error } = productApiRequest.useProducts("new");

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const products = data?.data || [];
  const slides = products.slice(0, 3).map((product) => ({
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
      <div ref={emblaRef}>
        <div
          style={{
            display: "flex",
            transition: "transform 300ms ease",
          }}
        >
          <>
            {isLoading ? (
              <div
                className="slider-1 slick-slide"
                style={{
                  backgroundImage: `url('/static/images/slider/background.jpg')`,
                  minWidth: "100%",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    height:"100%" ,
                    width: "30%",
                    top: 0,
                    right: 0,
                    bottom: 0,
                  }}
                >
                  <Skeleton height="100%" width="100%" />
                </div>

                <div className="caption" style={{ padding: "20px" }}>
                  <Skeleton
                    height={50}
                    width={400}
                    style={{ marginBottom: "10px" }}
                  />
                  <Skeleton
                    height={100}
                    width={700}
                    style={{ marginBottom: "10px" }}
                  />
                  <Skeleton height={50} width={120} borderRadius={5} />
                  <Skeleton
                    height={30}
                    width={70}
                    style={{ marginTop: "10px" }}
                  />
                </div>
              </div>
            ) : (
              slides.map((slide, index) => (
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
                    width={500}
                    height={300}
                    quality={100}
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
                      {slide.caption.button} <MoveRight />
                    </a>
                    <div className="bottom-caption hidden">
                      {slide.caption.bottomCaption}
                    </div>
                  </div>
                </div>
              ))
            )}
          </>
        </div>
      </div>
      <DotCarousel
        style={{
          position: "absolute",
        }}
        scrollSnaps={scrollSnaps}
        selectedIndex={selectedIndex}
        onClick={onDotButtonClick}
      ></DotCarousel>
    </div>
  );
}
