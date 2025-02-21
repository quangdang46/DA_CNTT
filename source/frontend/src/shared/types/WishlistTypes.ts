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
  page?: number;
  per_page?: number;
};
export type InfoWishlistType = {
  current_page: number;
  last_page: number;
  data: ProductListResType;
  from: number;
  to: number;
  total: number;
};

export type InfoWishlistResType = ResType<InfoWishlistType>;
