import orderApiRequest from "@/shared/apiRequests/order";
import { useTabs } from "@/shared/contexts/TabsContext";
import Link from "next/link";
import React from "react";

export default function OrdersTab() {
  const { activeTab } = useTabs();
  const { data, isLoading } = orderApiRequest.useGetOrder();
  const orders = data?.data;

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
      {orders?.length == 0 && (
        <div className="woocommerce-info">
          No order has been made yet.{" "}
          <Link className="woocommerce-Button wc-forward button" href="/shop">
            Browse products
          </Link>{" "}
        </div>
      )}
      {isLoading && <p>Loading...</p>}
    
    </div>
  );
}
