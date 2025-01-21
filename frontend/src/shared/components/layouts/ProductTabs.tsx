"use client";
import ProductDescription from "@/shared/components/ui/ProductDescription";
import ProductReview from "@/shared/components/ui/ProductReview";
import ProductSpecification from "@/shared/components/ui/ProductSpecification";
import { Product } from "@/shared/types/ProductTypes";
import React, { useState } from "react";

interface ProductTabsProps {
  product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description");
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const productDetails = {
    name: product.name,
    description: product.description,
    images: product.images.map((image) => image.image_url),
  };
 

  const groupMapping = {
    General: ["operating_system", "battery_capacity", "battery_type"],
    "Technical Specs": ["camera_resolution", "chip"],
    Physical: ["dimensions", "ram", "storage"],
  };

  const specifications = Object.entries(groupMapping).map(([title, keys]) => ({
    title,
    attributes: keys.map((key) => ({
      label: key,
      value: product.attributes[0][key], // Truy cập trực tiếp vào đối tượng
    })),
  }));

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
          name={productDetails.name}
          description={productDetails.description}
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
