"use client";
import Car from "@/shared/components/icons/Car";
import GridLarge from "@/shared/components/icons/GridLarge";
import GridListingSmall from "@/shared/components/icons/GridListingSmall";
import GridSmall from "@/shared/components/icons/GridSmall";
import GridSmallExtended from "@/shared/components/icons/GridSmallExtended";
import { useShopContext } from "@/shared/contexts/ShopContext";
import React from "react";

export default function ShopControlBar() {
  const { activeTab, setActiveTab } = useShopContext();
  const tabs = [
    {
      title: "Grid View",
      icon: <GridSmall></GridSmall>,
      type: "grid-view",
    },
    {
      title: "Grid Extended View",
      icon: <GridSmallExtended></GridSmallExtended>,
      type: "grid-view-extended",
    },
    {
      title: "List View Large",
      icon: <GridLarge></GridLarge>,
      type: "list-view-large",
    },
 
    {
      title: "List View Small",
      icon: <GridListingSmall></GridListingSmall>,
      type: "list-view-small",
    },
  ];
  return (
    <div className="shop-control-bar">
      <div className="handheld-sidebar-toggle">
        <button type="button" className="btn sidebar-toggler">
          <Car></Car>
          <span>Filters</span>
        </button>
      </div>
      {/* .handheld-sidebar-toggle */}
      <h1 className="woocommerce-products-header__title page-title">Shop</h1>
      <ul role="tablist" className="shop-view-switcher nav nav-tabs">
        {tabs.map((tab, index) => (
          <li key={index} className="nav-item">
            <div
              title={tab.title}
              className={`nav-link ${activeTab === tab.type ? "active" : ""}`}
              onClick={() => setActiveTab(tab.type)}
            >
              {tab.icon}
            </div>
          </li>
        ))}
      </ul>
      <form className="form-techmarket-wc-ppp" method="POST">
        <select className="techmarket-wc-wppp-select c-select" name="ppp">
          <option value={20}>Show 20</option>
          <option value={40}>Show 40</option>
          <option value={-1}>Show All</option>
        </select>
        <input type="hidden" defaultValue={5} name="shop_columns" />
        <input type="hidden" defaultValue={15} name="shop_per_page" />
        <input type="hidden" defaultValue="right-sidebar" name="shop_layout" />
      </form>
      <form method="get" className="woocommerce-ordering">
        <select className="orderby" name="orderby">
          <option value="popularity">Sort by popularity</option>
          <option value="rating">Sort by average rating</option>
          <option defaultValue={"date"} value="date">
            Sort by newness
          </option>
          <option value="price">Sort by price: low to high</option>
          <option value="price-desc">Sort by price: high to low</option>
        </select>
        <input type="hidden" defaultValue={5} name="shop_columns" />
        <input type="hidden" defaultValue={15} name="shop_per_page" />
        <input type="hidden" defaultValue="right-sidebar" name="shop_layout" />
      </form>
      <nav className="techmarket-advanced-pagination">
        <form className="form-adv-pagination" method="post">
          <input
            type="number"
            defaultValue={1}
            className="form-control"
            step={1}
            max={5}
            min={1}
            size={2}
            id="goto-page"
          />
        </form>{" "}
        of 5
        <a href="#" className="next page-numbers">
          →
        </a>
      </nav>
    </div>
  );
}
