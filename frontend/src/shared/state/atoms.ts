// src/state/atoms.js
import { Product } from "@/shared/types/ProductTypes";
import { atom } from "recoil";

export const productsState = atom<Product[]>({
  key: "productsState", // unique ID cho atom này
  default: [], // giá trị mặc định là mảng rỗng
});
