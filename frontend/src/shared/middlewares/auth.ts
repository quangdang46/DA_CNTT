import { MiddlewareFactory } from "@/shared/types/MiddlewareFactory";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export const checkAuthentication: MiddlewareFactory = (next) => {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    const token = req.cookies.get("auth_token"); // Lấy token từ cookie
    const pathName = req.nextUrl.pathname;
    if (pathName.startsWith("/authentication")) {
      if (token) {

        return NextResponse.redirect(new URL("/", req.url)); // Chuyển hướng về trang chủ
      }
    }

    return next(req, _next);
  };
};
