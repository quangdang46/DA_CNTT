"use client";
import ProductGrid from "@/shared/components/ui/Shop/Product/ProductGrid";
import { useShopContext } from "@/shared/contexts/ShopContext";
import { useCart } from "@/shared/hooks/useCart";
import useCompare from "@/shared/hooks/useCompare";
import React from "react";

export default function GridViewProduct() {
  const { handleAddToCompare, CompareModal } = useCompare();
  const { handleAddToCart } = useCart();
  const { activeTab, products } = useShopContext();
  return (
    <>
      <CompareModal></CompareModal>
      <div
        id="grid"
        className={`tab-pane  ${activeTab === "grid-view" ? "active" : ""}`}
        role="tabpanel"
      >
        <div className="woocommerce columns-4">
          <div className="products">
            {products.map((product) => (
              <ProductGrid
                key={product.id}
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
