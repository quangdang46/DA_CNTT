import { useTabs } from "@/shared/contexts/TabsContext";
import React from "react";

export default function LogoutTab() {
  const { activeTab } = useTabs();
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
      logout
    </div>
  );
}
