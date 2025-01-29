import { ResType } from "@/shared/types/resType";
export type WishList = {
  wishlist: string[];
  user_id: number;
};
export type WishListBodyType = {
  product_id: string;
};
export type WishlistResType = ResType<WishList>;
