import { MiddlewareFactory } from "@/shared/types/MiddlewareFactory";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "@/shared/utils/verifyToken";
export const checkAuthentication: MiddlewareFactory = (next) => {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    const token = req.cookies.get("auth_token")?.value;
    const pathName = req.nextUrl.pathname;

    const publicPages = ["/", "/details", "/about", "/contact"];
    const adminPages = ["/admin", "/admin/dashboard"]; // Trang chỉ admin truy cập

    if (!token && publicPages.includes(pathName)) {
      // Không yêu cầu xác thực nếu là trang công khai
      return next(req, _next);
    }

    if (pathName.startsWith("/authentication")) {
      // Nếu người dùng đã đăng nhập mà vào trang authentication -> chuyển hướng
      if (token) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    if (token) {
      try {
        // Giải mã token để lấy thông tin user
        const decoded = (await verifyJwtToken(token)) as {
          id: number;
          role: string;
        };
        // Kiểm tra quyền truy cập dựa trên role
        if (adminPages.includes(pathName) && decoded.role !== "admin") {
          return NextResponse.redirect(new URL("/403", req.url)); // Trang không đủ quyền
        }

        // Thêm thông tin người dùng vào request để sử dụng sau này
        // (req as any).user = decoded;
      } catch (err) {
        console.error("Invalid token:", err);
        return NextResponse.redirect(new URL("/login", req.url));
      }
    } else {
      // Nếu không có token và không phải trang công khai -> chuyển hướng đến login
      if (!publicPages.includes(pathName)) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    return next(req, _next);
  };
};
