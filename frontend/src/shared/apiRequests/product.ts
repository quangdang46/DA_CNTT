import apiClient from "@/shared/config/apiClient";
import {
  Product,
  ProductAdmin,
  ProductListResType,
  ProductSearchResType,
  ProductSearchType,
} from "@/shared/types/ProductTypes";
import { ResType } from "@/shared/types/resType";
import { useMutation, useQuery } from "@tanstack/react-query";
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
            return response;
          }

          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      },
      staleTime: 1000 * 60 * 5,
      enabled: !!type,
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
            return response;
          }

          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      },
      staleTime: 1000 * 60 * 5,
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
            return response;
          }

          return response;
        } catch (err) {
          toast.error("Failed to fetch product");
          throw err;
        }
      },
      enabled: !!slug, // Only run the query if slug exists
      staleTime: 1000 * 60 * 5, // Giữ dữ liệu trong 5 phút
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
            return response;
          }

          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      },
      staleTime: 1000 * 60 * 5,
      enabled: !!slug,
    });
  },

  useSearchProducts: ({
    name,
    minPrice,
    maxPrice,
    categories,
    page,
    perPage,
    sortBy,
  }: ProductSearchType) => {
    return useQuery<ResType<ProductSearchResType>, Error>({
      queryKey: [
        "products-search",
        name,
        minPrice,
        maxPrice,
        categories,
        page,
        perPage,
        sortBy,
      ],
      queryFn: async () => {
        try {
          // Khởi tạo URLSearchParams
          const params = new URLSearchParams();

          // Chỉ thêm tham số nếu có giá trị hợp lệ
          // Conditionally append query parameters only if valid
          if (name?.trim()) params.append("name", name.trim());
          if (minPrice && minPrice > 0)
            params.append("minPrice", minPrice.toString());
          if (maxPrice && maxPrice !== Infinity)
            params.append("maxPrice", maxPrice.toString());
          if (categories?.length)
            params.append("categories", categories.join(","));
          if (page && page > 1) params.append("page", page.toString());
          if (perPage && perPage > 0)
            params.append("perPage", perPage.toString());
          if (sortBy && sortBy !== "default") params.append("sortBy", sortBy);

          // Nếu không có tham số nào, URL chỉ là `/products/search`
          const baseUrl = "/products/search";
          const url = params.toString()
            ? `${baseUrl}?${params.toString()}`
            : baseUrl;
          console.log("url", url);
          const response = await apiClient.get<ResType<ProductSearchResType>>(
            // `/products/search?name=${name}&minPrice=${minPrice}&maxPrice=${maxPrice}&categories=${categories}`
            url
          );
          if (!response.success) {
            return response;
          }
          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      },
      placeholderData: (previousData) => previousData,
    });
  },

  getSearchProducts: async ({
    name,
    categories,
    page,
    perPage,
  }: ProductSearchType) => {
    try {
      const params = new URLSearchParams();

      if (name?.trim()) params.append("name", name.trim());
      if (categories?.length) params.append("categories", categories.join(","));
      if (page && page > 1) params.append("page", page.toString());
      if (perPage && perPage > 0) params.append("perPage", perPage.toString());

      const baseUrl = "/products/search";
      const url = params.toString()
        ? `${baseUrl}?${params.toString()}`
        : baseUrl;

      const response = await apiClient.get<ResType<ProductSearchResType>>(url);

      return response.success ? response : null;
    } catch (error) {
      console.error("API error:", error);
      return null;
    }
  },

  useGetProductPage: ({ page, perPage }: ProductSearchType) => {
    return useQuery<ProductSearchResType, Error>({
      queryKey: ["products", page, perPage],
      queryFn: async () => {
        try {
          const response = await apiClient.get<ProductSearchResType>(
            `/products/product-paginate?page=${page}&per_page=${perPage}`
          );

          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      },
      staleTime: 1000 * 60 * 5,
      placeholderData: (previousData) => previousData,
    });
  },
  useCreateProduct: () => {
    return useMutation({
      mutationFn: async (body: ProductAdmin) => {
        try {
          const response = await apiClient.post<
            ProductAdmin,
            ResType<ProductAdmin>
          >("/products/create", body);
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
