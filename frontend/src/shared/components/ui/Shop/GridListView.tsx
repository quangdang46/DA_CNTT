"use client";
import ProductListView from "@/shared/components/ui/Shop/Product/ProductListView";
import { useShopContext } from "@/shared/contexts/ShopContext";
import React from "react";

export default function GridListView() {
  const { activeTab, products } = useShopContext();
  return (
    <div
      id="list-view"
      className={`tab-pane  ${
        activeTab === "grid-list-view" ? "active" : ""
      }`}
      role="tabpanel"
    >
      <div className="woocommerce columns-1">
        <div className="products">
          {products.map((product, index) => (
            <ProductListView key={index} product={product} />
          ))}

        </div>
      </div>
    </div>
  );
}
