import {
  DistrictType,
  ProvinceType,
  WardType,
} from "@/shared/types/LocationTypes";
import { ResType } from "@/shared/types/resType";
import { z } from "zod";

const AddressType = z.object({
  id: z.number(),
  user_id: z.number(),
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

export const UserType = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  role: z.string(),
  loyalty_points: z.number(),
  addresses: z.array(AddressType),
});


export type UserResType = z.infer<typeof UserType>;
export type AccountType = {
  user: UserResType;
  role: string;
};

export type AccountResType = ResType<AccountType>;

export const UpdateMeBody = z
  .object({
    name: z.string().trim().min(2).max(256),
    phone: z
      .string()
      .min(10, { message: "Sdt phải nhất 10 ký tự" })
      .max(11, { message: "Sdt không quá 11 ký tự" }),
    email: z.string().email("Email không hợp lệ"),
    password: z
      .string()
      // .min(6, { message: "Mật khật phải nhất 6 ký tự" })
      // .max(100, { message: "Mật khật không quá 100 ký tự" })
      .optional(),
    password_1: z
      .string()
      // .min(6, { message: "Mật khật phải nhất 6 ký tự" })
      // .max(100, { message: "Mật khật không quá 100 ký tự" })
      .optional(),
    password_2: z
      .string()
      // .min(6, { message: "Mật khật phải nhất 6 ký tự" })
      // .max(100, { message: "Mật khật không quá 100 ký tự" })
      .optional(),
    loyalty_points: z.preprocess((value) => Number(value), z.number().min(0)),
  })
  .superRefine(({ password_1, password_2 }, ctx) => {
    if (password_2 !== password_1) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khật không khớp nhau",
        path: ["password_2"],
      });
    }
  });

export type UpdateMeBodyType = z.infer<typeof UpdateMeBody>;

//
