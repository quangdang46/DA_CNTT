import apiClient from "@/shared/config/apiClient";
import { Product, ProductListResType } from "@/shared/types/ProductTypes";
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
};

export default productApiRequest;
