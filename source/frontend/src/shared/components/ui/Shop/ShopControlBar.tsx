"use client";
import productApiRequest from "@/shared/apiRequests/product";

import { useShopContext } from "@/shared/contexts/ShopContext";
import { Filter, Grid2x2, Grid3x3, Rows2, Rows4, Table } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function ShopControlBar() {
  const { activeTab, setActiveTab, setProducts } = useShopContext();
  const searchParams = useSearchParams();
  const tabs = [
    {
      title: "Grid View",
      icon: <Grid3x3 strokeWidth={1} />,
      type: "grid-view",
    },
    {
      title: "Grid Extended View",
      icon: <Table strokeWidth={1} />,
      type: "grid-view-extended",
    },
    {
      title: "List View",
      icon: <Rows4 strokeWidth={1} />,
      type: "grid-list-view",
    },
    {
      title: "List View Large",
      icon: <Grid2x2 strokeWidth={1} />,
      type: "list-view-large",
    },

    {
      title: "List View Small",
      icon: <Rows2 strokeWidth={1} />,
      type: "list-view-small",
    },
  ];

  // Chuyển đổi tham số URL thành đối tượng lọc
  const filters = new URLSearchParams(searchParams?.toString() || "");
  const name = filters.get("name") || "";
  const minPrice = parseFloat(filters.get("minPrice") || "0");
  const maxPrice = parseFloat(filters.get("maxPrice") || "Infinity");
  const categories =
    filters
      .get("categories")
      ?.split(",")
      .map((cat) => cat.trim()) || [];
  const sortBy = filters.get("sortBy") || "default";
  const page = parseInt(filters.get("page") || "1", 10);
  const perPage = parseInt(filters.get("perPage") || "20", 10);

  const filtersObj = {
    name,
    minPrice,
    maxPrice,
    categories,
    sortBy,
    page,
    perPage,
  };

  // Sử dụng custom hook để gọi API
  const { data } = productApiRequest.useSearchProducts(filtersObj);

  // Lưu kết quả vào context khi có dữ liệu
  useEffect(() => {
    if (data) {
      setProducts(data?.data.data);
    }
  }, [data, setProducts]);

  const updateURLAndFetch = (params: Record<string, string | number>) => {
    const currentParams = new URLSearchParams(searchParams?.toString() || "");

    Object.entries(params).forEach(([key, value]) => {
      if (value) currentParams.set(key, value.toString());
      else currentParams.delete(key); // Xóa nếu không có giá trị
    });

    // Cập nhật URL
    const url = new URL(window.location.href);
    url.search = currentParams.toString();
    window.history.pushState({}, "", url.toString());
    console.log(currentParams.toString());
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateURLAndFetch({ sortBy: event.target.value });
  };

  const handlePaginationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const page = event.target.value || "1";
    updateURLAndFetch({ page });
  };

  return (
    <div className="shop-control-bar">
      <div className="handheld-sidebar-toggle">
        <button type="button" className="btn sidebar-toggler">
          <Filter strokeWidth={1} />
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
        <select
          className="techmarket-wc-wppp-select c-select"
          name="ppp"
          onChange={(e) => updateURLAndFetch({ perPage: e.target.value })}
        >
          <option value={20}>Show 20</option>
          <option value={40}>Show 40</option>
          <option value={-1}>Show All</option>
        </select>
      </form>
      <form method="get" className="woocommerce-ordering">
        <select className="orderby" name="orderby" onChange={handleSortChange}>
          <option value="rating">Sort by average rating</option>
          <option defaultValue={"date"} value="date">
            Sort by newness
          </option>
          <option value="price-asc">Sort by price: low to high</option>
          <option value="price-desc">Sort by price: high to low</option>
        </select>
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
            onChange={handlePaginationChange}
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
