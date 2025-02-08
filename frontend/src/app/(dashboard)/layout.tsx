"use client";
import wishlistApiRequest from "@/shared/apiRequests/wishlist";
import Footer from "@/shared/components/layouts/Footer";
import HeaderBar from "@/shared/components/layouts/HeaderBar";
import Header from "@/shared/components/ui/Header";
import { RootState } from "@/shared/state/store";
import { setWishlist } from "@/shared/state/wishlistSlice";
import { ERoleType } from "@/shared/types/RoleTypes";
import { WishlistResType } from "@/shared/types/WishlistTypes";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const roleFromStore = useSelector(
    (state: RootState) => state.auth.user?.role
  );
  const dispatch = useDispatch();
  const [role, setRole] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false); // Chặn SSR lỗi hydration

  // Đợi đến khi component mounted mới lấy role để tránh mismatch giữa server & client
  useEffect(() => {
    setIsMounted(true);
    setRole(roleFromStore || ERoleType.GUEST);
  }, [roleFromStore]);

  // Chuyển hướng admin nếu cần
  useEffect(() => {
    if (isMounted && role === ERoleType.ADMIN) {
      if (
        typeof window !== "undefined" &&
        !window.location.pathname.startsWith("/admin")
      ) {
        router.replace("/admin");
      }
    }
  }, [role, isMounted, router]);

  // Fetch wishlist nếu user không phải admin
  const { data: wishlistData } = useQuery<Partial<WishlistResType>, Error>({
    queryKey: ["wishlist"],
    queryFn: async () => {
      if (isLoggedIn && data?.data?.role !== ERoleType.ADMIN) {
        try {
          const response = await wishlistApiRequest.getWishlist();
          if (!response.success) {
            // throw new Error(response.message);
            // Đảm bảo trả về response thay vì ném lỗi
            if (!response.success) {
              return {
                data: { wishlist: [], user_id: 0 },
              } as Partial<WishlistResType>;
            }
          }
          return response;
        } catch (error) {
          console.error("API error:", error);
          return {
            data: { wishlist: [], user_id: 0 },
          } as Partial<WishlistResType>;
        }
      } else {
        return {
          data: { wishlist: [], user_id: 0 },
        } as Partial<WishlistResType>;
      }
    },
    enabled: isLoggedIn, // Chỉ gọi API khi người dùng đã đăng nhập
    retry: false,
  });

  useEffect(() => {
    // Dispatch wishlist to Redux
    if (wishlistData?.data) {
      dispatch(setWishlist(wishlistData.data.wishlist));
    }
  }, [dispatch, wishlistData]);

  // Chặn SSR render UI trước khi role xác định → Tránh mismatch giữa server & client
  if (!isMounted || !role) return null;

  return role === ERoleType.ADMIN ? (
    <>{children}</>
  ) : (
    <>
      <HeaderBar />
      <Header />
      {children}
      <Footer />
    </>
  );
}
