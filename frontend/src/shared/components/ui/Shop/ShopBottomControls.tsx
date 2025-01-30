"use client";
import Pagination from "@/shared/components/ui/Component/Pagination";
import { useShopContext } from "@/shared/contexts/ShopContext";
import { ProductSearchType } from "@/shared/types/ProductTypes";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ShopBottomControls() {
  const { data } = useShopContext();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<ProductSearchType>({
    name: "",
    minPrice: 0,
    maxPrice: Infinity,
    categories: [],
    sortBy: "default",
    perPage: 20,
    page: 1,
  });

  // Cập nhật filters khi có sự thay đổi từ URL
  useEffect(() => {
    const nameFilter = searchParams?.get("name") || "";
    const minPrice = parseFloat(searchParams?.get("minPrice") || "0");
    const maxPrice = parseFloat(searchParams?.get("maxPrice") || "Infinity");
    const categories =
      searchParams
        ?.get("categories")
        ?.split(",")
        .map((cat) => cat.trim()) || [];
    const sortBy = searchParams?.get("sortBy") || "default";
    const perPage = parseInt(searchParams?.get("perPage") || "20");
    const page = parseInt(searchParams?.get("page") || "1");

    // Chỉ cập nhật khi các tham số thực sự thay đổi
    setFilters((prevFilters: ProductSearchType) => {
      const newFilters = {
        name: nameFilter,
        minPrice,
        maxPrice,
        categories,
        sortBy,
        perPage,
        page,
      };
      if (JSON.stringify(prevFilters) !== JSON.stringify(newFilters)) {
        return newFilters;
      }
      return prevFilters;
    });
  }, [searchParams]);

  // Cập nhật URL khi filters thay đổi
  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);

    // Thêm các tham số mới hoặc cập nhật tham số hiện tại
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== Infinity && value !== 0) {
        currentParams.set(key, value.toString());
      } else {
        currentParams.delete(key); // Xóa tham số nếu không có giá trị hợp lệ
      }
    });

    // Cập nhật URL mà không reload trang
    const url = new URL(window.location.href);
    url.search = currentParams.toString();
    window.history.pushState({}, "", url.toString());

    console.log(currentParams.toString()); // In ra URL với các tham số mới
  }, [filters]);

  return (
    <div className="shop-control-bar-bottom">
      <form className="form-techmarket-wc-ppp" method="POST">
        <select
          className="techmarket-wc-wppp-select c-select"
          name="ppp"
          value={filters.perPage}
          onChange={(e) => {
            const perPage = parseInt(e.target.value);
            setFilters((prevFilters) => ({
              ...prevFilters,
              perPage,
            }));
          }}
        >
          <option value={20}>Show 20</option>
          <option value={40}>Show 40</option>
          <option value={-1}>Show All</option>
        </select>
      </form>
      {/* .form-techmarket-wc-ppp */}
      <p className="woocommerce-result-count">
        Showing {data?.data?.from}–{data?.data?.to} of {data?.data?.total}{" "}
        results
      </p>

      <nav className="woocommerce-pagination">
        {data?.data?.current_page !== undefined &&
          data?.data?.last_page !== undefined && (
            <Pagination
              currentPage={data?.data?.current_page}
              totalPages={data?.data?.last_page}
              onPageChange={(page) => {
                console.log(page);
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  page,
                }));
              }}
            />
          )}
      </nav>
    </div>
  );
}
