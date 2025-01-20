"use client";
import productApiRequest from "@/shared/apiRequests/product";
import ProductsCarousel from "@/shared/components/ui/ProductsCarousel";
import { useTabs } from "@/shared/contexts/TabsContext";
import { ProductListResType } from "@/shared/types/ProductTypes";
import { ResType } from "@/shared/types/resType";
import React, { useEffect, useState } from "react";

export default function ProductsCarouselWrapper() {
  const { activeTab } = useTabs();
  const [products, setProducts] = useState<ProductListResType | []>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response: ResType<ProductListResType> =
        await productApiRequest.getByUrlAndType({
          url: "/products/byType",
          type: activeTab,
        });
      if (response.success) {
        setProducts(response.data);
      }
    };
    fetchProducts();
  }, [activeTab]);
  return <ProductsCarousel products={products}></ProductsCarousel>;
}
