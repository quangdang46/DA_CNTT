import BrandsCarousel from "@/shared/components/ui/BrandsCarousel";
import Breadcrumb from "@/shared/components/ui/Breadcrumb";
import FilterBar from "@/shared/components/ui/Shop/FilterBar";
import MainShopList from "@/shared/components/ui/Shop/MainShopList";
import { ShopProvider } from "@/shared/contexts/ShopContext";
import React from "react";

export default function Page() {
  return (
    <>
      <div id="content" className="site-content">
        <div className="col-full">
          <div className="row">
            <Breadcrumb></Breadcrumb>
            <ShopProvider>
              <MainShopList></MainShopList>
              <FilterBar></FilterBar>
            </ShopProvider>
          </div>
        </div>
      </div>
      <div className="col-full">
        {/* <BrandsCarousel></BrandsCarousel> */}
      </div>
    </>
  );
}
