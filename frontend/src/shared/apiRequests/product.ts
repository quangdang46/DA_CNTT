import apiClient from "@/shared/config/apiClient";
import {
  Product,
  ProductListResType,
  ProductSearchType,
} from "@/shared/types/ProductTypes";
import { ResType } from "@/shared/types/resType";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const productApiRequest = {
  useProducts: (type: string) => {
    return useQuery<ResType<ProductListResType>, Error>({
      queryKey: ["products", type],
      queryFn: async () => {
        try {
          const response = await apiClient.post<
            { type: string },
            ResType<ProductListResType>
          >("/products/byType", { type });

          if (!response.success) {
            throw new Error(response.message || "Failed to fetch products");
          }

          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      },
    });
  },
  useProductList: () => {
    return useQuery<ResType<ProductListResType>, Error>({
      queryKey: ["products"],
      queryFn: async () => {
        try {
          const response = await apiClient.get<ResType<ProductListResType>>(
            "/products"
          );

          if (!response.success) {
            throw new Error(response.message || "Failed to fetch products");
          }

          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      },
    });
  },
  useProductDetail: (slug: string) => {
    return useQuery<ResType<Product>, Error>({
      queryKey: ["product", slug],
      queryFn: async () => {
        if (!slug) {
          toast.error("Slug not found");
          throw new Error("Slug is required");
        }

        try {
          const response = await apiClient.get<ResType<Product>>(
            `/products/${slug}`
          );

          if (!response.success) {
            toast.error(response.message);
            throw new Error(response.message);
          }

          return response;
        } catch (err) {
          toast.error("Failed to fetch product");
          throw err;
        }
      },
      enabled: !!slug, // Only run the query if slug exists
    });
  },
  useProductsRelatedBySlug: (slug: string) => {
    return useQuery<ResType<ProductListResType>, Error>({
      queryKey: ["products-related", slug],
      queryFn: async () => {
        try {
          const response = await apiClient.get<ResType<ProductListResType>>(
            `/products/related/${slug}`
          );

          if (!response.success) {
            throw new Error(response.message || "Failed to fetch products");
          }

          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      },
    });
  },

  useSearchProducts: ({
    name,
    minPrice,
    maxPrice,
    categories,
  }: ProductSearchType) => {
    return useQuery<ResType<ProductListResType>, Error>({
      queryKey: ["products-search", name, minPrice, maxPrice, categories],
      queryFn: async () => {
        try {
          // Khởi tạo URLSearchParams
          const params = new URLSearchParams();

          // Chỉ thêm tham số nếu có giá trị hợp lệ
          if (name?.trim()) {
            params.append("name", name.trim());
          }
          if (minPrice && minPrice > 0) {
            params.append("minPrice", minPrice.toString());
          }
          if (maxPrice && maxPrice !== Infinity) {
            params.append("maxPrice", maxPrice.toString());
          }
          if (categories?.length) {
            params.append("categories", categories.join(","));
          }

          // Nếu không có tham số nào, URL chỉ là `/products/search`
          const baseUrl = "/products/search";
          const url = params.toString()
            ? `${baseUrl}?${params.toString()}`
            : baseUrl;

          const response = await apiClient.get<ResType<ProductListResType>>(
            // `/products/search?name=${name}&minPrice=${minPrice}&maxPrice=${maxPrice}&categories=${categories}`
            url
          );
          if (!response.success) {
            throw new Error(response.message || "Failed to fetch products");
          }
          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      },
    });
  },
};

export default productApiRequest;
