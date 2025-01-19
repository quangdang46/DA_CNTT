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
