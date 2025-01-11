"use client";
import React from "react";
import ProductsCarouselTabs from "@/shared/components/ui/ProductsCarouselTabs";
import ProductsCarousel from "@/shared/components/ui/ProductsCarousel";
import SaleCarouselHeader from "@/shared/components/ui/SaleCarouselHeader";
import SaleCarouselFooter from "@/shared/components/ui/SaleCarouselFooter";
import SaleProductsCarousel from "@/shared/components/ui/SaleProductsCarousel";
import { CarouselProvider } from "@/shared/contexts/CarouselContext";
export default function DealsCarousel() {
  const products = [
    {
      title: "Tablet Red EliteBook Revolve",
      price: 425.89,
      originalPrice: 545.89,
      savedAmount: 120.0,
      imageUrl:
        "https://images.unsplash.com/photo-1736177046343-32c5d0f9bcc6?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Laptop EliteBook 1050",
      price: 599.99,
      originalPrice: 699.99,
      savedAmount: 100.0,
      imageUrl:
        "https://images.unsplash.com/photo-1735722446915-3147b65b05c3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Laptop EliteBook 1050",
      price: 599.99,
      originalPrice: 699.99,
      savedAmount: 100.0,
      imageUrl:
        "https://images.unsplash.com/photo-1735722446915-3147b65b05c3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Laptop EliteBook 1050",
      price: 599.99,
      originalPrice: 699.99,
      savedAmount: 100.0,
      imageUrl:
        "https://images.unsplash.com/photo-1735722446915-3147b65b05c3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Laptop EliteBook 1050",
      price: 599.99,
      originalPrice: 699.99,
      savedAmount: 100.0,
      imageUrl:
        "https://images.unsplash.com/photo-1735722446915-3147b65b05c3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    // Thêm các sản phẩm khác ở đây
  ];
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
            <SaleProductsCarousel products={products}></SaleProductsCarousel>
            {/* ///////////// */}
            <SaleCarouselFooter></SaleCarouselFooter>
          </CarouselProvider>
        </div>
      </section>

      <section className="column-2 section-products-carousel-tabs tab-carousel-1">
        <div className="section-products-carousel-tabs-wrap">
          <ProductsCarouselTabs
            tabs={[
              { title: "New Arrivals", content: "Content for New Arrivals." },
              { title: "On Sale", content: "Content for On Sale." },
              { title: "Best Rated", content: "Content for Best Rated." },
            ]}
          />

          <ProductsCarousel products={products}></ProductsCarousel>
        </div>
      </section>
    </div>
  );
}
