"use client";
import React from "react";
import ProductsCarouselTabs from "@/shared/components/ui/ProductsCarouselTabs";
import SaleCarouselHeader from "@/shared/components/ui/SaleCarouselHeader";
import SaleCarouselFooter from "@/shared/components/ui/SaleCarouselFooter";
import SaleProductsCarousel from "@/shared/components/ui/SaleProductsCarousel";
import { CarouselProvider } from "@/shared/contexts/CarouselContext";
import { TabsProvider } from "@/shared/contexts/TabsContext";
import ProductsCarouselWrapper from "@/shared/components/layouts/ProductsCarouselWrapper";
export default function DealsCarousel() {
  return (
    <div className="section-deals-carousel-and-products-carousel-tabs row">
      <section
        className="column-1 deals-carousel"
        id="sale-with-timer-carousel"
      >
        <div className="deals-carousel-inner-block">
          <CarouselProvider>
            <SaleCarouselHeader></SaleCarouselHeader>
            {/* ///////////// */}
            <SaleProductsCarousel></SaleProductsCarousel>
            {/* ///////////// */}
            <SaleCarouselFooter></SaleCarouselFooter>
          </CarouselProvider>
        </div>
      </section>

      <section className="column-2 section-products-carousel-tabs tab-carousel-1">
        <div className="section-products-carousel-tabs-wrap">
          <TabsProvider>
            <ProductsCarouselTabs
              tabs={[
                {
                  title: "On Sale",
                  content: "Content for On Sale.",
                  type: "on-sale",
                },
                {
                  title: "Best Seller",
                  content: "Content for Best Seller.",
                  type: "best-seller",
                },
                {
                  title: "High Rated",
                  content: "Content for High Rated.",
                  type: "high-rated",
                },
              ]}
            />
            <ProductsCarouselWrapper></ProductsCarouselWrapper>
          </TabsProvider>
        </div>
      </section>
    </div>
  );
}
