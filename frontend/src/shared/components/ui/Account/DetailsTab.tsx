import { useTabs } from "@/shared/contexts/TabsContext";
import React from "react";

export default function DetailsTab() {
  const { activeTab } = useTabs();
  return (
    <div
      className="woocommerce-MyAccount-content"
      style={
        activeTab === "account-details"
          ? { display: "block" }
          : { display: "none" }
      }
    >
      <div className="woocommerce-notices-wrapper"></div>
      details
    </div>
  );
}
