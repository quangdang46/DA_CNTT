"use client";
import ProductSmall from "@/shared/components/ui/Shop/Product/ProductSmall";
import { useShopContext } from "@/shared/contexts/ShopContext";
import React from "react";

export default function GridViewSmall() {
  const { activeTab, products } = useShopContext();

  return (
    <div
      id="list-view-small"
      className={`tab-pane  ${activeTab === "list-view-small" ? "active" : ""}`}
      role="tabpanel"
    >
      <div className="woocommerce columns-1">
        <div className="products">
          {products.map((product, index) => (
            <ProductSmall key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
