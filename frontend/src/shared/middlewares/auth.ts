import { MiddlewareFactory } from "@/shared/types/MiddlewareFactory";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export const checkAuthentication: MiddlewareFactory = (next) => {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    const token = req.cookies.get("auth_token")?.value; // Lấy token từ cookie
    const pathName = req.nextUrl.pathname;

    // Danh sách các trang mà guest có thể truy cập mà không cần đăng nhập
    const publicPages = ["/", "/details", "/about", "/contact"]; // Thêm các đường dẫn trang công cộng ở đây

    // Nếu người dùng không có token và đang truy cập vào trang công cộng, cho phép truy cập
    if (!token && publicPages.includes(pathName)) {
      return next(req, _next);
    }

    // Nếu có token và yêu cầu vào trang authentication, chuyển hướng về trang chủ
    if (pathName.startsWith("/authentication")) {
      if (token) {
        return NextResponse.redirect(new URL("/", req.url)); // Chuyển hướng về trang chủ
      }
    }

    return next(req, _next);
  };
};
