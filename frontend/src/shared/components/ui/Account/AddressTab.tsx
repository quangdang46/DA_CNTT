import { useTabs } from "@/shared/contexts/TabsContext";
import React from "react";

export default function AddressTab() {
  const { activeTab } = useTabs();
  return (
    <div
      className="woocommerce-MyAccount-content"
      style={
        activeTab === "account-address"
          ? { display: "block" }
          : { display: "none" }
      }
    >
      <div className="woocommerce-notices-wrapper"></div>
      address
    </div>
  );
}
