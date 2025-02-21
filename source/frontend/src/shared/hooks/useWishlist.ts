// useWishlist.ts
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "@/shared/state/wishlistSlice";
import { RootState } from "@/shared/state/store";
import { useMutation } from "@tanstack/react-query";
import {
  WishListBodyType,
  WishlistResType,
} from "@/shared/types/WishlistTypes";
import apiClient from "@/shared/config/apiClient";
import { toast } from "react-toastify";

export const useWishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  // Kiểm tra sản phẩm có trong wishlist không
  const isInWishlist = (productId: string) => wishlist.includes(productId);
  // Mutation để toggle wishlist
  const toggleWishlistMutation = useMutation<WishlistResType, Error, string>({
    mutationFn: async (productId) => {
      const response = await apiClient.post<WishListBodyType, WishlistResType>(
        "/wishlist/toggle",
        { product_id: productId }
      );

      if (!response.success) {
        return response;
      }
      return response;
    },
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error) => {
      console.error("API error:", error);
    },
  });
  // Thêm/xóa sản phẩm trong wishlist
  const handleToggleWishlist = (id: string) => {
    dispatch(toggleWishlist(id));
    if (isLoggedIn) {
      // Nếu đăng nhập, gọi API
      toggleWishlistMutation.mutate(id);
    }else{
      toast.success("Added to wishlist");
    }
  };

  return {
    wishlist,
    isInWishlist,
    toggleWishlist: handleToggleWishlist,
  };
};
