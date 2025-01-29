import apiClient from "@/shared/config/apiClient";
import {
  WishListBodyType,
  WishlistResType,
} from "@/shared/types/WishlistTypes";
import { useQuery } from "@tanstack/react-query";

const wishlistApiRequest = {
  getWishlist: () => apiClient.get<WishlistResType>("/wishlist"),
  useToggleWishlist: (productId: string) => {
    return useQuery<WishlistResType, Error>({
      queryKey: ["toggle-wishlist", productId],
      queryFn: async () => {
        try {
          const response = await apiClient.post<
            WishListBodyType,
            WishlistResType
          >("/wishlist/toggle", { product_id: productId });

          if (!response.success) {
            return response;
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

export default wishlistApiRequest;
