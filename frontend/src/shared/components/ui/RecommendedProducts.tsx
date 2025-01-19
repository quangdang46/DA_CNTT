import React from "react";
import RecommendedProductsList from "@/shared/components/ui/RecommendedProductsList";

export default function RecommendedProducts({
  title = "Related products",
}: {
  title?: string | null;
}) {
  return (
    <div
      className="tm-related-products-carousel section-products-carousel"
      id="tm-related-products-carousel"
    >
      <section className="related">
        <header className="section-header">
          <h2 className="section-title">{title}</h2>
          <nav className="custom-slick-nav"></nav>
        </header>
        <RecommendedProductsList></RecommendedProductsList>
      </section>
    </div>
  );
}
