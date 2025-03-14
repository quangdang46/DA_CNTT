"use client";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import CheckBox from "@/shared/components/ui/Component/CheckBox";
import RangeSlider from "@/shared/components/ui/Component/RangeSlider";
import { useSearchParams } from "next/navigation";
import LatestProductsCarousel from "@/shared/components/ui/Shop/Slider/LatestProductsCarousel";
import LastedHeader from "@/shared/components/ui/Shop/Slider/LastedHeader";
import { Category } from "@/shared/types/CategoryTypes";
import { categoryApiRequest } from "@/shared/apiRequests/category";
type CheckboxItem = {
  id: number;
  label: string;
  checked: boolean;
};
export default function FilterBar() {
  const searchParams = useSearchParams();
  const [value, setValue] = useState({ min: 0, max: 7000000 });
  const [name, setName] = useState(searchParams?.get("name") || "");
  const { data: categories } = categoryApiRequest.useGetCategories();
  const [checkboxes, setCheckboxes] = useState<CheckboxItem[]>([]);

  useEffect(() => {
    if (categories?.data) {
      setCheckboxes(
        categories.data.map((category: Category) => ({
          id: category.id,
          label: category.name,
          checked: false,
        }))
      );
    }
  }, [categories]);

  const handleCheck = useCallback((id: number) => {
    setCheckboxes((prev) =>
      prev.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  }, []);

  const applyFilters = useCallback(() => {
    const selectedCategory = checkboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.id)
      .join(",");

    const updatedParams = new URLSearchParams(searchParams?.toString() || "");
    updatedParams.set("minPrice", value.min.toString());
    updatedParams.set("maxPrice", value.max.toString());
    if (name) {
      updatedParams.set("name", name);
    } else {
      updatedParams.delete("name");
    }

    if (selectedCategory) {
      updatedParams.set("categories", selectedCategory);
    } else {
      updatedParams.delete("categories");
    }

    const url = new URL(window.location.href);
    url.search = updatedParams.toString();
    window.history.pushState({}, "", url.toString());
  }, [checkboxes, name, searchParams, value]);

  const priceFilterSection = useMemo(
    () => (
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
            // defaultValue={`${value.min} - ${value.max}$`}
            value={`${value.min} - ${value.max} VNĐ`}
            readOnly
            name="min_price"
          />
          <button className="button" onClick={applyFilters}>
            Filter
          </button>
        </div>
        <RangeSlider
          min={0}
          max={7000000}
          value={value}
          step={175000}
          onChange={setValue}
        />
      </div>
    ),
    [value, applyFilters]
  );

  const nameFilterSection = useMemo(
    () => (
      <div
        className="widget woocommerce widget_price_filter"
        id="woocommerce_price_filter-2"
      >
        <span className="gamma widget-title">Filter by name</span>
        <div className="price_slider_amount">
          <input
            id="name_product"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
    ),
    [name]
  );

  const brandFilterSection = useMemo(
    () => (
      <div
        className="widget woocommerce widget_layered_nav maxlist-more"
        id="woocommerce_layered_nav-2"
      >
        <span className="gamma widget-title">Categories</span>
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
    ),
    [checkboxes, handleCheck]
  );

  return (
    <div id="secondary-shop" className="widget-area shop-sidebar">
      <div
        id="techmarket_products_filter-3"
        className="widget widget_techmarket_products_filter"
      >
        <span className="gamma widget-title">Filters</span>
        {nameFilterSection}
        {priceFilterSection}
        {brandFilterSection}
      </div>
      <div className="widget widget_techmarket_products_carousel_widget">
        <section
          id="single-sidebar-carousel"
          className="section-products-carousel"
        >
          <LastedHeader title="Latest Products"></LastedHeader>

          <LatestProductsCarousel></LatestProductsCarousel>
        </section>
      </div>
    </div>
  );
}
