import { ResType } from "@/shared/types/resType";
import { z } from "zod";

export const LoginBodyType = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export type LoginBodyType = z.infer<typeof LoginBodyType>;

export const LoginResData = z.object({
  token: z.string(),
  expiresAt: z.number(),
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    role: z.string(),
  }),
  role: z.string(),
});

export type LoginResType = ResType<typeof LoginResData>;

export const LoginErrorResData = z.object({
  token: z.null(),
  expiresAt: z.null(),
  user: z.null(),
  role: z.null(),
});

export type LoginErrorResType = ResType<typeof LoginErrorResData>;

export const RegisterBodyType = z
  .object({
    name: z.string().trim().min(2).max(256),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    password_confirmation: z.string().min(6).max(100),
  })
  .strict()
  .superRefine(({ password_confirmation, password }, ctx) => {
    if (password_confirmation !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["password_confirmation"],
      });
    }
  });
export type RegisterBodyType = z.infer<typeof RegisterBodyType>;

export const RegisterResData = z.object({
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
  }),
});
export type RegisterResType = ResType<typeof RegisterResData>;

export const RefreshTokenResData = z.object({
  token: z.string(),
});
export type RefreshTokenResType = ResType<typeof RefreshTokenResData>;
