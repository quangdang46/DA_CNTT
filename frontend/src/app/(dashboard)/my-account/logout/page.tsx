"use client";
import authRequestApi from "@/shared/apiRequests/auth";
import apiClient from "@/shared/config/apiClient";
import { setLogout } from "@/shared/state/authSlice";
import { clearCart } from "@/shared/state/cartSlice";
import { loadWishlist } from "@/shared/state/wishlistSlice";
import { useMutation } from "@tanstack/react-query";
import { deleteCookie } from "cookies-next/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const sessionToken = searchParams.get("auth_token");
  const [hasLoggedOut, setHasLoggedOut] = useState(false);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const localToken = localStorage.getItem("auth_token");
      if (sessionToken === localToken) {
        // Bước 1: Gọi API logout để thông báo với server
        const response = await authRequestApi.logout();

        if (response.success) {
          // Bước 2: Lấy wishlist từ localStorage và lưu vào Redux
          const storedWishlist = localStorage.getItem("wishlist");
          if (storedWishlist) {
            try {
              const parsedWishlist = JSON.parse(storedWishlist);
              if (Array.isArray(parsedWishlist)) {
                dispatch(loadWishlist(parsedWishlist));
              }
            } catch (error) {
              console.error("Error parsing wishlist", error);
            }
          }

          // Bước 3: Tạo hoặc lấy guest_id
          const guestId = localStorage.getItem("guest_id") || uuidv4();
          localStorage.setItem("guest_id", guestId); // Lưu guest_id

          // Bước 4: Gọi API để chuyển giỏ hàng từ user sang guest
          await apiClient.post("/cart/transfer-to-guest", {
            guest_id: guestId,
          });

          // Bước 5: Xóa token và redirect
          deleteCookie("auth_token");
          localStorage.removeItem("auth_token");
          dispatch(setLogout());
          dispatch(clearCart());
          toast.success(response.message);
          router.push("/");
        }
        return response;
      }
    },
    onError: (error) => {
      toast.error("Logout failed");
      console.error(error);
    },
  });

  useEffect(() => {
    if (sessionToken && !hasLoggedOut) {
      logoutMutation.mutate();
      setHasLoggedOut(true);
    }
  }, [hasLoggedOut, logoutMutation, sessionToken]);

  return null;
}
