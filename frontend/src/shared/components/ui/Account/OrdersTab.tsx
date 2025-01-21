import { useTabs } from "@/shared/contexts/TabsContext";
import React from "react";

export default function OrdersTab() {
  const { activeTab } = useTabs();
  return (
    <div
      className="woocommerce-MyAccount-content"
      style={
        activeTab === "account-orders"
          ? { display: "block" }
          : { display: "none" }
      }
    >
      <div className="woocommerce-notices-wrapper"></div>
      order
    </div>
  );
}
