"use client";
import ProductExtended from "@/shared/components/ui/Shop/Product/ProductExtended";
import { useShopContext } from "@/shared/contexts/ShopContext";
import { useCart } from "@/shared/hooks/useCart";
import useCompare from "@/shared/hooks/useCompare";
import React from "react";

export default function GridExtendedProduct() {
  const { activeTab, products } = useShopContext();
  const { handleAddToCompare, CompareModal } = useCompare();
  const { handleAddToCart } = useCart();
  return (
    <>
      <CompareModal></CompareModal>
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
              <ProductExtended
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
