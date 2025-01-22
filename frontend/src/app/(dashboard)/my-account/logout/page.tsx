"use client";
import authRequestApi from "@/shared/apiRequests/auth";
import { setLogout } from "@/shared/state/authSlice";
import { deleteCookie } from "cookies-next/client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
function LogoutLogic() {
  const router = useRouter();
  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const sessionToken = searchParams.get("auth_token");
  useEffect(() => {
    // function call logout
    const logout = async () => {
      const controller = new AbortController();
      const signal = controller.signal;
      if (sessionToken === localStorage.getItem("auth_token")) {
        const response = await authRequestApi.logout(signal);
        if (response.success) {
          deleteCookie("auth_token");
          toast.success(response.message);
        }
        dispatch(setLogout());
        router.push(`/`);
      }
      return () => {
        controller.abort();
      };
    };
    logout();
  }, [sessionToken, router, dispatch]);
  return <div>page</div>;
}

export default function page() {
  return (
    <Suspense>
      <LogoutLogic></LogoutLogic>
    </Suspense>
  );
}
