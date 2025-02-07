/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ERoleType } from "@/shared/types/RoleTypes";
import { verifyJwtToken } from "@/shared/utils/verifyToken";

export async function getRoleFromToken(token: string) {
  if (!token) {
    return ERoleType.GUEST;
  }
  try {
    const decoded = (await verifyJwtToken(token)) as {
      id: number;
      role: string;
    };
    return decoded.role;
  } catch (error: any) {
    return ERoleType.GUEST;
  }
}
