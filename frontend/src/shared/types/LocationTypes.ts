import { ResType } from "@/shared/types/resType";
import { z } from "zod";

// Định nghĩa schema cho Province
export const ProvinceType = z.object({
  code: z.string(),
  name: z.string(),
  name_en: z.string().nullable(),
  full_name: z.string(),
  full_name_en: z.string().nullable(),
  code_name: z.string().nullable(),
  administrative_unit_id: z.number().nullable(),
  administrative_region_id: z.number().nullable(),
});

// Định nghĩa schema cho District
export const DistrictType = z.object({
  code: z.string(),
  name: z.string(),
  name_en: z.string().nullable(),
  full_name: z.string().nullable(),
  full_name_en: z.string().nullable(),
  code_name: z.string().nullable(),
  province_code: z.string(),
  administrative_unit_id: z.number().nullable(),
});

// Định nghĩa schema cho Ward
export const WardType = z.object({
  code: z.string(),
  name: z.string(),
  name_en: z.string().nullable(),
  full_name: z.string().nullable(),
  full_name_en: z.string().nullable(),
  code_name: z.string().nullable(),
  district_code: z.string(),
  administrative_unit_id: z.number().nullable(),
});

export const AddressType = z.object({
  id: z.string(),
  user_id: z.string(),
  ward_code: z.string(),
  district_code: z.string(),
  province_code: z.string(),
  address: z.string(),
  is_default: z.number(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
  province: ProvinceType,
  district: DistrictType,
  ward: WardType,
});
export type Address = z.infer<typeof AddressType>;
export type Province = z.infer<typeof ProvinceType>;
export type District = z.infer<typeof DistrictType>;
export type Ward = z.infer<typeof WardType>;

export type ProvinceListResType = ResType<Province[]>;
export type DistrictListResType = ResType<District[]>;
export type WardListResType = ResType<Ward[]>;

export type AddressBodyType = {
  id?: string;
  address: string;
  province_code: string;
  district_code: string;
  ward_code: string;
}
