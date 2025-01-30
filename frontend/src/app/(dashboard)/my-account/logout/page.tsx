"use client";
import authRequestApi from "@/shared/apiRequests/auth";
import { setLogout } from "@/shared/state/authSlice";
import { loadWishlist } from "@/shared/state/wishlistSlice";
import { useMutation } from "@tanstack/react-query";
import { deleteCookie } from "cookies-next/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

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
        const response = await authRequestApi.logout();

        if (response.success) {
          deleteCookie("auth_token");
          localStorage.removeItem("auth_token");
          toast.success(response.message);
          dispatch(setLogout());
          // Lấy wishlist từ localStorage
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
