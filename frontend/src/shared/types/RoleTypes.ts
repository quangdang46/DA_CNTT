// enum

import { ResType } from "@/shared/types/resType";

export enum ERoleType {
  "GUEST" = "guest",
  "EMPLOYEE" = "employee",
  "ADMIN" = "admin",
}

export type RoleType = {
  role: string;
};

// RoleResType:role
export type RoleResType = ResType<RoleType>;
