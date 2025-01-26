"use client";
import ProductGrid from "@/shared/components/ui/Shop/Product/ProductGrid";
import { useShopContext } from "@/shared/contexts/ShopContext";
import React from "react";

export default function GridViewProduct() {
  const { activeTab } = useShopContext();
  return (
    <div
      id="grid"
      className={`tab-pane  ${activeTab === "grid-view" ? "active" : ""}`}
      role="tabpanel"
    >
      <div className="woocommerce columns-4">
        <div className="products">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductGrid key={index} />
          ))}
        </div>
        {/* .products */}
      </div>
      {/* .woocommerce */}
    </div>
  );
}
