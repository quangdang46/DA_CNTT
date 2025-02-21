import apiClient from "@/shared/config/apiClient";
import {
  InfoWishlistBodyType,
  InfoWishlistResType,
  WishlistResType,
} from "@/shared/types/WishlistTypes";
import { useQuery } from "@tanstack/react-query";

const wishlistApiRequest = {
  getWishlist: () => apiClient.get<WishlistResType>("/wishlist"),
  useInfoWishlist: (
    product_ids: string[],
    page: number,
    per_page: number = 3
  ) => {
    return useQuery<InfoWishlistResType, Error>({
      queryKey: ["wishlist", product_ids, page],
      queryFn: async () => {
        try {
          const response = await apiClient.post<
            InfoWishlistBodyType,
            InfoWishlistResType
          >("/wishlist/info", { product_ids, page, per_page });
          if (!response.success) {
            return response;
          }
          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      },
      
      enabled: product_ids.length > 0,
      
    });
  },
};

export default wishlistApiRequest;
