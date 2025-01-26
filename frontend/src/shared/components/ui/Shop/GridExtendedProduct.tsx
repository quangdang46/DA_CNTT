"use client";
import ProductExtended from "@/shared/components/ui/Shop/Product/ProductExtended";
import { useShopContext } from "@/shared/contexts/ShopContext";
import React from "react";

export default function GridExtendedProduct() {
  const { activeTab, products } = useShopContext();
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
          {products.map((product) => (
            <ProductExtended key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
