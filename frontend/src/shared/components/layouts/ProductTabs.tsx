"use client";
import ProductDescription from "@/shared/components/ui/ProductDescription";
import ProductReview from "@/shared/components/ui/ProductReview";
import ProductSpecification from "@/shared/components/ui/ProductSpecification";
import React, { useState } from "react";

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("description");
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  const productDetails = {
    title: "Exceptional color and clarity",
    description:
      "Nullam dignissim elit ut urna rutrum, a fermentum mi auctor. Mauris efficitur magna orci, et dignissim lacus scelerisque sit amet...",
    videoUrl: "https://www.youtube.com/embed/K5OGs8a3vlM?ecver=1",
    images: [
      "https://plus.unsplash.com/premium_photo-1673126680854-0a20e55c61d7?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1711284882804-e2dad4e21429?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  };

  const specifications = [
    {
      title: "General",
      attributes: [
        { label: "Brand", value: "Galaxy" },
        { label: "Label", value: "A+" },
      ],
    },
    {
      title: "Technical Specs",
      attributes: [
        { label: "Screen Size", value: "40″" },
        { label: "Aspect Ratio", value: "16:9" },
        { label: "3DTV", value: "No" },
      ],
    },
    {
      title: "Connectivity",
      attributes: [
        { label: "HDMI", value: "2 In" },
        { label: "LAN", value: "1" },
        { label: "USB", value: "2" },
      ],
    },
  ];
  return (
    <div className="woocommerce-tabs wc-tabs-wrapper">
      <ul role="tablist" className="nav tabs wc-tabs">
        <li className="nav-item description_tab">
          <div
            className={`nav-link ${
              activeTab === "description" ? "active" : ""
            }`}
            onClick={() => handleTabClick("description")}
            role="tab"
            aria-controls="tab-description"
            style={{ cursor: "pointer" }}
          >
            Description
          </div>
        </li>
        <li className="nav-item specification_tab">
          <div
            className={`nav-link ${
              activeTab === "specification" ? "active" : ""
            }`}
            onClick={() => handleTabClick("specification")}
            role="tab"
            style={{ cursor: "pointer" }}
            aria-controls="tab-specification"
          >
            Specification
          </div>
        </li>
        <li className="nav-item reviews_tab">
          <div
            className={`nav-link ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => handleTabClick("reviews")}
            role="tab"
            style={{ cursor: "pointer" }}
            aria-controls="tab-reviews"
          >
            Reviews (1)
          </div>
        </li>
      </ul>
      <div className="tab-content">
        <ProductDescription
          activeTab={activeTab}
          title={productDetails.title}
          description={productDetails.description}
          videoUrl={productDetails.videoUrl}
          images={productDetails.images}
        ></ProductDescription>
        <ProductSpecification
          activeTab={activeTab}
          specifications={specifications}
        ></ProductSpecification>
        <ProductReview activeTab={activeTab}></ProductReview>
      </div>
    </div>
  );
}
