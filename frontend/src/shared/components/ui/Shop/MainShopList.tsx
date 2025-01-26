"use client";
import GridExtendedProduct from "@/shared/components/ui/Shop/GridExtendedProduct";
import GridViewLarge from "@/shared/components/ui/Shop/GridViewLarge";
import GridViewProduct from "@/shared/components/ui/Shop/GridViewProduct";
import GridViewSmall from "@/shared/components/ui/Shop/GridViewSmall";
import ShopArchiveHeader from "@/shared/components/ui/Shop/ShopArchiveHeader";
import ShopBottomControls from "@/shared/components/ui/Shop/ShopBottomControls";
import ShopControlBar from "@/shared/components/ui/Shop/ShopControlBar";
import { useShopContext } from "@/shared/contexts/ShopContext";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function MainShopList() {
  const searchParams = useSearchParams();
  // const { setProducts } = useShopContext();
  useEffect(() => {
    // Lấy các tham số từ URL
    const nameFilter = searchParams?.get("name") || "";
    const minPrice = parseFloat(searchParams?.get("minPrice") || "0");
    const maxPrice = parseFloat(searchParams?.get("maxPrice") || "Infinity");
    const categories =
      searchParams
        ?.get("categories")
        ?.split(",")
        .map((cat) => cat.trim()) || [];
        console.log({nameFilter, minPrice, maxPrice, categories});
  }, [searchParams]);
  return (
    <div id="primary-shop" className="content-area">
      <main id="main-shop" className="site-main">
        <ShopArchiveHeader></ShopArchiveHeader>
        <ShopControlBar></ShopControlBar>
        <div className="tab-content">
          <GridViewProduct></GridViewProduct>
          <GridExtendedProduct></GridExtendedProduct>
          <GridViewLarge></GridViewLarge>
          <GridViewSmall></GridViewSmall>
        </div>
        <ShopBottomControls></ShopBottomControls>
      </main>
    </div>
  );
}
