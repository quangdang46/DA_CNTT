"use client";
import ProductExtended from "@/shared/components/ui/Shop/Product/ProductExtended";
import { useShopContext } from "@/shared/contexts/ShopContext";
import React from "react";

export default function GridExtendedProduct() {
  const { activeTab } = useShopContext();

  return (
    <div
      id="grid-extended"
      className={`tab-pane  ${
        activeTab === "grid-view-extended" ? "active" : ""
      }`}
      role="tabpanel"
    >
      <div className="woocommerce columns-4">
        <div className="products">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductExtended key={index} />
          ))}
        </div>
        {/* .products */}
      </div>
      {/* .woocommerce */}
    </div>
  );
}
