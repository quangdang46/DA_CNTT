"use client";
import React, { createContext, useContext, useState } from "react";
import { EmblaCarouselType } from "embla-carousel"; // Nếu bạn đang sử dụng EmblaCarousel

// Định nghĩa kiểu dữ liệu cho context
interface CarouselContextType {
  emblaApi: EmblaCarouselType | undefined;
  setEmblaApi: React.Dispatch<React.SetStateAction<EmblaCarouselType | null>>;
}

const CarouselContext = createContext<CarouselContextType | null>(null); // Khởi tạo context với kiểu dữ liệu

export const useCarouselContext = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error(
      "useCarouselContext must be used within a CarouselProvider"
    );
  }
  return context;
};

export const CarouselProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null);

  return (
    <CarouselContext.Provider value={{ emblaApi, setEmblaApi }}>
      {children}
    </CarouselContext.Provider>
  );
};
