import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductSearchType } from "@/shared/types/ProductTypes";

export const useProductFilters = () => {
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

  // Cập nhật filters từ URL
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

    setFilters((prevFilters) => {
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

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== Infinity && value !== 0) {
        currentParams.set(key, value.toString());
      } else {
        currentParams.delete(key);
      }
    });

    const url = new URL(window.location.href);
    url.search = currentParams.toString();
    window.history.pushState({}, "", url.toString());
  }, [filters]);

  return { filters, setFilters };
};
