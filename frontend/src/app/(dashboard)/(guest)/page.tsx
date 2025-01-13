"use client";
import FeaturesList from "@/shared/components/ui/FeaturesList";
import HomePageSlider from "@/shared/components/ui/HomePageSlider";
import NoticeBanner from "@/shared/components/ui/NoticeBanner";
import DealsCarousel from "@/shared/components/ui/DealsCarousel";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { productsState } from "@/shared/state/atoms";
import { products } from "@/shared/constants/products-test";
import RecommendedProducts from "@/shared/components/ui/RecommendedProducts";
import ProductDisplay from "@/shared/components/ui/ProductDisplay";
import BannerImage from "@/shared/components/ui/BannerImage";
import PromotionalBanners from "@/shared/components/ui/PromotionalBanners";

const Home = () => {
  const setProducts = useSetRecoilState(productsState);
  useEffect(() => {
    setProducts(products); // Cập nhật giá trị của `products`
  }, []);
  return (
    <div id="content" className="site-content">
      <div className="col-full">
        <div className="row">
          <div id="primary" className="content-area">
            <main id="main" className="site-main">
              {/* //////////// */}
              <HomePageSlider></HomePageSlider>
              <FeaturesList></FeaturesList>
              <DealsCarousel></DealsCarousel>
              <NoticeBanner></NoticeBanner>
              {/* //////////// */}
              <RecommendedProducts
                products={products}
                title={"Hot Best Sellers"}
              ></RecommendedProducts>
              <BannerImage></BannerImage>
              <ProductDisplay
                products={products}
                title={"New Arrivals"}
              ></ProductDisplay>
              <PromotionalBanners></PromotionalBanners>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
