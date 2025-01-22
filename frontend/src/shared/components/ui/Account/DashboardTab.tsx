import { useTabs } from "@/shared/contexts/TabsContext";
import { RootState } from "@/shared/state/store";
import Link from "next/link";

import React from "react";
import { useSelector } from "react-redux";

export default function DashboardTab() {
  const { activeTab, setActiveTab } = useTabs();

  const { user, token } = useSelector((state: RootState) => state.auth);

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
      <p>
        Hello <strong>{user.email}</strong> (not
        <strong> {user.email}</strong>?
        <Link href={`/my-account/logout?auth_token=${token}`}>Log out</Link>)
      </p>

      <p>
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
      </p>
    </div>
  );
}
