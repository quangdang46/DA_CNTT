import FeaturesList from "@/shared/components/ui/FeaturesList";
import HomePageSlider from "@/shared/components/ui/HomePageSlider";
import NoticeBanner from "@/shared/components/ui/NoticeBanner";
import DealsCarousel from "@/shared/components/ui/DealsCarousel";
import React from "react";
// import EmblaCarouselExample from "@/shared/components/ui/Test";

const Home = () => {
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
              {/* <EmblaCarouselExample></EmblaCarouselExample> */}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
