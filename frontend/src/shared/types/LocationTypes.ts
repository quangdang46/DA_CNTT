import { ResType } from "@/shared/types/resType";

// Định nghĩa các kiểu dữ liệu cho Tỉnh, Quận, Phường
export interface Province {
  code: string;
  name: string;
  name_en: string;
  full_name: string;
  full_name_en: string;
  code_name: string;
  administrative_unit_id: number;
}

export interface District {
  code: string;
  name: string;
  name_en: string;
  full_name: string;
  full_name_en: string;
  code_name: string;
  province_code: string;
  administrative_unit_id: number;
}

export interface Ward {
  code: string;
  name: string;
  name_en: string;
  full_name: string;
  full_name_en: string;
  code_name: string;
  district_code: string;
  administrative_unit_id: number;
}
export type ProvinceListResType = ResType<Province[]>;
export type DistrictListResType = ResType<District[]>;
export type WardListResType = ResType<Ward[]>;
