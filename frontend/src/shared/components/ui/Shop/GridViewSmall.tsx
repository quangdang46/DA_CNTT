"use client";
import ProductSmall from "@/shared/components/ui/Shop/Product/ProductSmall";
import { useShopContext } from "@/shared/contexts/ShopContext";
import React from "react";

export default function GridViewSmall() {
  const { activeTab } = useShopContext();

  return (
    <div
      id="list-view-small"
      className={`tab-pane  ${activeTab === "list-view-small" ? "active" : ""}`}
      role="tabpanel"
    >
      <div className="woocommerce columns-1">
        <div className="products">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSmall key={index} />
          ))}
        </div>
        {/* .products */}
      </div>
      {/* .woocommerce */}
    </div>
  );
}
