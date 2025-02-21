"use client";
import ProductListView from "@/shared/components/ui/Shop/Product/ProductListView";
import { useShopContext } from "@/shared/contexts/ShopContext";
import { useCart } from "@/shared/hooks/useCart";
import useCompare from "@/shared/hooks/useCompare";
import React from "react";

export default function GridListView() {
  const { activeTab, products } = useShopContext();
  const { handleAddToCompare, CompareModal } = useCompare();
  const { handleAddToCart } = useCart();
  return (
    <>
      <CompareModal></CompareModal>
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
              <ProductListView
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
