"use client";
import productApiRequest from "@/shared/apiRequests/product";
import ProductsCarousel from "@/shared/components/ui/ProductsCarousel";
import { useTabs } from "@/shared/contexts/TabsContext";
import React from "react";
import Skeleton from "react-loading-skeleton";

export default function ProductsCarouselWrapper() {
  const { activeTab } = useTabs();

  const { data, isLoading, error } = productApiRequest.useProducts(activeTab);


  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const products = data?.data || [];
 if (isLoading) {
   return (
     <div
       style={{
         display: "grid",
         gridTemplateColumns: "repeat(5, 1fr)",
         gap: "10px",
       }}
     >
       {Array.from({ length: 10 }).map((_, index) => (
         <div key={index}>
           <Skeleton height={180} />
           <Skeleton height={30} width="50%"  />
           <Skeleton height={20} width="80%" />
         </div>
       ))}
     </div>
   );
 }
  return <ProductsCarousel products={products} ></ProductsCarousel>;
}
