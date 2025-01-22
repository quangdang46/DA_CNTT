import { useTabs } from "@/shared/contexts/TabsContext";
import { RootState } from "@/shared/state/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function LogoutTab() {
  const { activeTab } = useTabs();
  const { token } = useSelector((state: RootState) => state.auth);
  const [isClient, setIsClient] = useState(false);
  // Đảm bảo rằng chỉ thực hiện trên client
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Không render nội dung này trong SSR
  }
  return (
    <div
      className="woocommerce-MyAccount-content"
      style={
        activeTab === "account-logout"
          ? { display: "block" }
          : { display: "none" }
      }
    >
      <div className="woocommerce-notices-wrapper"></div>
      <div className="woocommerce-info">
        You are now logged out.
        <Link
          className="button wc-forward"
          href={`/my-account/logout?auth_token=${token}`}
        >
          Log out
        </Link>
      </div>
    </div>
  );
}
