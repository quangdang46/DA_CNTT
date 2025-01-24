import GridExtendedProduct from "@/shared/components/ui/Shop/GridExtendedProduct";
import GridViewLarge from "@/shared/components/ui/Shop/GridViewLarge";
import GridViewProduct from "@/shared/components/ui/Shop/GridViewProduct";
import GridViewSmall from "@/shared/components/ui/Shop/GridViewSmall";
import ShopArchiveHeader from "@/shared/components/ui/Shop/ShopArchiveHeader";
import ShopBottomControls from "@/shared/components/ui/Shop/ShopBottomControls";
import ShopControlBar from "@/shared/components/ui/Shop/ShopControlBar";
import React from "react";

export default function MainShopList() {
  return (
    <div id="primary" className="content-area">
      <main id="main" className="site-main">
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
