"use client";
import CheckBox from "@/shared/components/ui/Component/CheckBox";
import RangeSlider from "@/shared/components/ui/Component/RangeSlider";
import React, { useState } from "react";

export default function FilterBar() {
  const [value, setValue] = useState({ min: 0, max: 100 });
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, label: "Option 1", checked: false },
    { id: 2, label: "Option 2", checked: false },
    { id: 3, label: "Option 3", checked: false },
  ]);

  const handleCheck = (id: number) => {
    setCheckboxes((prev) =>
      prev.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  const getCheckedValues = () => {
    return checkboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.label);
  };

  return (
    <div id="secondary-shop" className="widget-area shop-sidebar">
      <div
        id="techmarket_products_filter-3"
        className="widget widget_techmarket_products_filter"
      >
        <span className="gamma widget-title">Filters</span>
        <div
          className="widget woocommerce widget_price_filter"
          id="woocommerce_price_filter-2"
        >
          <p>
            <span className="gamma widget-title">Filter by price</span>
          </p>
          <div className="price_slider_amount">
            <input
              id="amount"
              type="text"
              placeholder="Min price"
              defaultValue={`${value.min} - ${value.max}$`}
              name="min_price"
              style={{ display: "none" }}
            />
            <button className="button" type="submit">
              Filter
            </button>
          </div>
          <RangeSlider
            min={0}
            max={100}
            value={value}
            step={1}
            onChange={(value) => setValue(value)}
          ></RangeSlider>
        </div>
        <div
          className="widget woocommerce widget_layered_nav maxlist-more"
          id="woocommerce_layered_nav-2"
        >
          <span className="gamma widget-title">Brands</span>
          <ul>
            {checkboxes.map((checkbox) => (
              <li className="wc-layered-nav-term" key={checkbox.id}>
                <CheckBox
                  name={`checkbox-${checkbox.id}`}
                  label={checkbox.label}
                  val={checkbox.checked}
                  setValue={() => handleCheck(checkbox.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* <div className="widget widget_techmarket_products_carousel_widget">
        <section
          id="single-sidebar-carousel"
          className="section-products-carousel"
        >
          <header className="section-header">
            <h2 className="section-title">Latest Products</h2>
            <nav className="custom-slick-nav" />
          </header>
          <div className="products-carousel">
            <div className="container-fluid">
              <div className="woocommerce columns-1">
                <div className="products">
                  <div className="landscape-product-widget product">
                    <a
                      className="woocommerce-LoopProduct-link"
                      href="single-product-fullwidth.html"
                    >
                      <div className="media">
                        <img
                          className="wp-post-image"
                          src="assets/images/products/sm-1.jpg"
                          alt=""
                        />
                        <div className="media-body">
                          <span className="price">
                            <ins>
                              <span className="amount"> 50.99</span>
                            </ins>
                            <del>
                              <span className="amount">26.99</span>
                            </del>
                          </span>
                          <h2 className="woocommerce-loop-product__title">
                            S100 Wireless Bluetooth Speaker – Neon Green
                          </h2>
                          <div className="techmarket-product-rating">
                            <div
                              title="Rated 0 out of 5"
                              className="star-rating"
                            >
                              <span style={{ width: "0%" }}>
                                <strong className="rating">0</strong> out of 5
                              </span>
                            </div>
                            <span className="review-count">(0)</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
             
                </div>
              </div>
            </div>
          </div>
        </section>
      </div> */}
    </div>
  );
}
