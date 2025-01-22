import { useTabs } from "@/shared/contexts/TabsContext";
import { RootState } from "@/shared/state/store";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function DashboardTab() {
  const { activeTab, setActiveTab } = useTabs();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isClient, setIsClient] = useState(false);

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
        activeTab === "account-dashboard"
          ? { display: "block" }
          : { display: "none" }
      }
    >
      <div className="woocommerce-notices-wrapper"></div>
      <div>
        Hello <strong>{user?.email}</strong>
      </div>

      <div>
        From your account dashboard you can view your
        <strong
          className="text-danger"
          style={{ cursor: "pointer" }}
          onClick={() => setActiveTab("account-orders")}
        >
          {" "}
          recent orders
        </strong>
        , manage your
        <strong
          className="text-danger"
          style={{ cursor: "pointer" }}
          onClick={() => setActiveTab("account-address")}
        >
          {" "}
          shipping and billing addresses
        </strong>
        , and
        <strong
          className="text-danger"
          style={{ cursor: "pointer" }}
          onClick={() => setActiveTab("account-details")}
        >
          {" "}
          edit your password and account details
        </strong>
        .
      </div>
    </div>
  );
}
