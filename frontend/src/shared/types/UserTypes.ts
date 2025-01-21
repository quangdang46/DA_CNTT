import { ResType } from "@/shared/types/resType";
import { z } from "zod";

export const UserType = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  role: z.string(),
  loyalty_points: z.number(),
});

export type UserResType = z.infer<typeof UserType>;

export type AccountResType = ResType<UserResType>;

export const UpdateMeBody = z
  .object({
    name: z.string().trim().min(2).max(256),
    phone: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    password_confirmation: z.string().min(6).max(100),
  })
  .superRefine(({ password_confirmation, password }, ctx) => {
    if (password_confirmation !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khật khớp nhau",
        path: ["password_confirmation"],
      });
    }
  });

export type UpdateMeBodyType = z.infer<typeof UpdateMeBody>;
