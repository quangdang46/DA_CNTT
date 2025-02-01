import { ResType } from "@/shared/types/resType";

export type Category = {
  id: number;
  name: string;
};

export type CategoryResType = ResType<Category[]>;
