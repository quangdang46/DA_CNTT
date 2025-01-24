import Breadcrumb from "@/shared/components/ui/Breadcrumb";
import FilterBar from "@/shared/components/ui/Shop/FilterBar";
import MainShopList from "@/shared/components/ui/Shop/MainShopList";
import React from "react";

export default function Page() {
  return (
    <div id="content" className="site-content">
      <div className="col-full">
        <div className="row">
          <Breadcrumb></Breadcrumb>
          <MainShopList></MainShopList>
          <FilterBar></FilterBar>
        </div>
      </div>
    </div>
  );
}
