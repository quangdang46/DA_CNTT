"use client";
import ProductGrid from "@/shared/components/ui/Shop/Product/ProductGrid";
import { useShopContext } from "@/shared/contexts/ShopContext";
import React from "react";

export default function GridViewProduct() {
  const { activeTab, products } = useShopContext();
  return (
    <div
      id="grid"
      className={`tab-pane  ${activeTab === "grid-view" ? "active" : ""}`}
      role="tabpanel"
    >
      <div className="woocommerce columns-4">
        <div className="products">
         
          {products.map((product) => (
            <ProductGrid key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
