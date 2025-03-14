

"use client";
import productApiRequest from "@/shared/apiRequests/product";
import GridExtendedProduct from "@/shared/components/ui/Shop/GridExtendedProduct";
import GridListView from "@/shared/components/ui/Shop/GridListView";
import GridViewLarge from "@/shared/components/ui/Shop/GridViewLarge";
import GridViewProduct from "@/shared/components/ui/Shop/GridViewProduct";
import GridViewSmall from "@/shared/components/ui/Shop/GridViewSmall";
import ShopArchiveHeader from "@/shared/components/ui/Shop/ShopArchiveHeader";
import ShopBottomControls from "@/shared/components/ui/Shop/ShopBottomControls";
import ShopControlBar from "@/shared/components/ui/Shop/ShopControlBar";
import { useShopContext } from "@/shared/contexts/ShopContext";
import { useEffect, useMemo } from "react";
import { useProductFilters } from "@/shared/hooks/useProductFilters"; // Import custom hook

export default function MainShopList() {
  const { setProducts, setData } = useShopContext();
  const { filters } = useProductFilters(); // Sử dụng custom hook

  const { data } = productApiRequest.useSearchProducts({
    name: filters.name,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    categories: filters.categories,
    sortBy: filters.sortBy,
    page: filters.page,
    perPage: filters.perPage,
  });

  const products = useMemo(() => data?.data?.data || [], [data]);

  useEffect(() => {
    if (products.length > 0) {
      setProducts(products);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setData(data as any);
    }
  }, [data, products, setData, setProducts]);

  return (
    <div id="primary-shop" className="content-area">
      <main id="main-shop" className="site-main">
        <ShopArchiveHeader></ShopArchiveHeader>
        <ShopControlBar></ShopControlBar>
        <div className="tab-content">
          <GridViewProduct></GridViewProduct>
          <GridExtendedProduct></GridExtendedProduct>
          <GridListView></GridListView>
          <GridViewLarge></GridViewLarge>
          <GridViewSmall></GridViewSmall>
        </div>
        <ShopBottomControls></ShopBottomControls>
      </main>
    </div>
  );
}