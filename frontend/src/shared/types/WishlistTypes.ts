import { ProductListResType } from "@/shared/types/ProductTypes";
import { ResType } from "@/shared/types/resType";
export type WishList = {
  wishlist: string[];
  user_id: number;
};
export type WishListBodyType = {
  product_id: string;
};
export type WishlistResType = ResType<WishList>;

export type InfoWishlistBodyType = {
  product_ids: string[];
};

export type InfoWishlistResType = ResType<ProductListResType>;
