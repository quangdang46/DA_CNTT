"use client";
import ProductLarge from "@/shared/components/ui/Shop/Product/ProductLarge";
import { useShopContext } from "@/shared/contexts/ShopContext";
import React from "react";

export default function GridViewLarge() {
  const { activeTab, products } = useShopContext();
  return (
    <div
      id="list-view-large"
      className={`tab-pane  ${activeTab === "list-view-large" ? "active" : ""}`}
      role="tabpanel"
    >
      <div className="woocommerce columns-1">
        {products.map((product, index) => (
          <ProductLarge key={index} product={product} />
        ))}
      </div>
    </div>
  );
}
