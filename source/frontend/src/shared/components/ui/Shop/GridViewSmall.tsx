"use client";
import ProductSmall from "@/shared/components/ui/Shop/Product/ProductSmall";
import { useShopContext } from "@/shared/contexts/ShopContext";
import { useCart } from "@/shared/hooks/useCart";
import useCompare from "@/shared/hooks/useCompare";
import React from "react";

export default function GridViewSmall() {
  const { activeTab, products } = useShopContext();
  const { handleAddToCompare, CompareModal } = useCompare();
  const { handleAddToCart } = useCart();

  return (
    <>
      <CompareModal></CompareModal>
      <div
        id="list-view-small"
        className={`tab-pane  ${
          activeTab === "list-view-small" ? "active" : ""
        }`}
        role="tabpanel"
      >
        <div className="woocommerce columns-1">
          <div className="products">
            {products.map((product, index) => (
              <ProductSmall
                key={index}
                product={product}
                onAddToCompare={handleAddToCompare}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
