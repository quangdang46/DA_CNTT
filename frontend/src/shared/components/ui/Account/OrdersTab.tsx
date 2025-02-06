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
      {/* 
      <div class="woocommerce-info">
		No order has been made yet. <a class="woocommerce-Button wc-forward button" href="https://techmarket.madrasthemes.com/shop/">Browse products</a>	</div>
      */}
    </div>
  );
}
