"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React from "react";
import Autoplay from "embla-carousel-autoplay";

export default function HomePageSlider() {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true}, [Autoplay()]);

  const slides = [
    {
      backgroundImage:
        "https://images.unsplash.com/photo-1736177046343-32c5d0f9bcc6?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      image:
        "https://plus.unsplash.com/premium_photo-1672363353897-ae5a81a1ab57?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: {
        title:
          "Turn. Click. Expand. Smart modular design simplifies adding storage for growing media.",
        subTitle:
          "Powerful Six Core processor, vibrant 4KUHD display output and fast SSD elegantly cased in a soft alloy design.",
        button: "Get Yours now",
        bottomCaption: "Free shipping on US Terority",
      },
      className: "slider-1 slick-slide",
    },
    {
      backgroundImage:
        "https://images.unsplash.com/photo-1736177046343-32c5d0f9bcc6?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      image:
        "https://images.unsplash.com/photo-1736267737328-26c39ef475c5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: {
        title: "The new-tech gift you are wishing for is right here",
        subTitle:
          "Big screens in incredibly slim designs that fit in your hand.",
        button: "Browse now",
        bottomCaption: "Free shipping on US Terority",
      },
      className: "slider-1 slider-2 slick-slide",
    },
  ];
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
                  fill
                  style={{
                    objectFit: "cover", // Hoặc "contain" nếu muốn giữ tỉ lệ và toàn bộ ảnh hiển thị
                  }}
                  sizes="100vw"
                />
                <div className="caption">
                  <div className="title hidden">{slide.caption.title}</div>
                  <div className="sub-title hidden">
                    {slide.caption.subTitle}
                  </div>
                  <div className="button hidden">
                    {slide.caption.button}{" "}
                    <i className="tm tm-long-arrow-right"></i>
                  </div>
                  <div className="bottom-caption hidden">
                    {slide.caption.bottomCaption}
                  </div>
                </div>
              </div>
            ))}
          </>
        </div>
      </div>

      {/* Pagination (Dots) */}
      {/* <ul className="slick-dots" role="tablist">
                  {[0, 1].map((index) => (
                    <li
                      key={index}
                      role="presentation"
                      className={selectedIndex === index ? "slick-active" : ""}
                    >
                      <button
                        type="button"
                        data-role="none"
                        role="button"
                        tabIndex={0}
                        onClick={() => emblaApi?.scrollTo(index)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul> */}
    </div>
  );
}
