"use client";
import FeaturesList from "@/shared/components/ui/FeaturesList";
import HomePageSlider from "@/shared/components/ui/HomePageSlider";
import NoticeBanner from "@/shared/components/ui/NoticeBanner";
import DealsCarousel from "@/shared/components/ui/DealsCarousel";
import React, { useEffect } from "react";
import RecommendedProducts from "@/shared/components/ui/RecommendedProducts";
import ProductDisplay from "@/shared/components/ui/ProductDisplay";
import BannerImage from "@/shared/components/ui/BannerImage";
import PromotionalBanners from "@/shared/components/ui/PromotionalBanners";
import LandscapeFullProductCardsCarousel from "@/shared/components/layouts/LandscapeFullProductCardsCarousel";
import { useDispatch } from "react-redux";
import { fetchProducts } from "@/shared/state/productsSlice";
import { AppDispatch } from "@/shared/state/store";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
              <RecommendedProducts
                title={"Hot Best Sellers"}
              ></RecommendedProducts>
              <BannerImage></BannerImage>
              <ProductDisplay title={"New Arrivals"}></ProductDisplay>
              <PromotionalBanners></PromotionalBanners>
              <LandscapeFullProductCardsCarousel></LandscapeFullProductCardsCarousel>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
