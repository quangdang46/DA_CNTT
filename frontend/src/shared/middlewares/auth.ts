import { MiddlewareFactory } from "@/shared/types/MiddlewareFactory";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "@/shared/utils/verifyToken";
export const checkAuthentication: MiddlewareFactory = (next) => {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    const token = req.cookies.get("auth_token")?.value;
    const pathName = req.nextUrl.pathname;

    const publicPages = ["/", "/details", "/about", "/contact"];
    const adminPages = ["/admin", "/admin/dashboard"]; // Trang chỉ admin truy cập
    const guestPages = ["/my-account"]; // Trang dành cho khách khong vao

    if (!token) {
      // Nếu không có token và là trang công khai, cho phép truy cập
      if (publicPages.includes(pathName)) {
        return next(req, _next);
      }

      // Nếu không có token và cố truy cập vào admin hoặc guest -> Chuyển hướng
      if (adminPages.includes(pathName) || guestPages.includes(pathName)) {
        return NextResponse.redirect(new URL("/authentication", req.url)); // Chuyển đến trang đăng nhập
      }
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

        if (decoded.role === "admin") {
          // Nếu là admin, không cho phép truy cập vào các trang công khai như "/"
          if (publicPages.includes(pathName)) {
            return NextResponse.redirect(new URL("/admin", req.url)); // Chuyển hướng đến trang admin
          }
        }

        // Kiểm tra quyền truy cập dành cho guest
        if (guestPages.includes(pathName) && decoded.role !== "guest") {
          return NextResponse.redirect(new URL("/403", req.url)); // Không đủ quyền truy cập
        }

        // Kiểm tra quyền truy cập dành cho admin
        if (adminPages.includes(pathName) && decoded.role !== "admin") {
          return NextResponse.redirect(new URL("/403", req.url)); // Không đủ quyền truy cập
        }

        // return response;
      } catch (err) {
        console.error("Invalid token:", err);
        // Nếu token không hợp lệ -> Chuyển hướng đến trang đăng nhập
        console.error("Invalid token:", err);
        const response = NextResponse.redirect(
          new URL("/authentication", req.url)
        );
        response.cookies.set("auth_token", "", { maxAge: 0 }); // Xóa cookie
        return response;
      }
    }

    // Nếu không rơi vào các trường hợp trên, cho phép truy cập
    return next(req, _next);
  };
};
