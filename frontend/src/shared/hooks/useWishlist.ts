"use client";
import { RootState } from "@/shared/state/store";
import { toggleWishlist } from "@/shared/state/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";

export const useWishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist);

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  return {
    wishlist,
    isInWishlist,
    toggleWishlist: (id: string) => dispatch(toggleWishlist(id)),
  };
};
