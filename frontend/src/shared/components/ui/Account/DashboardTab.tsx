import { useTabs } from "@/shared/contexts/TabsContext";
import React from "react";

export default function DashboardTab() {
  const { activeTab } = useTabs();
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
        Hello <strong>tranquangdang21</strong> (not
        <strong>tranquangdang21</strong>?
        <a href="https://techmarket.madrasthemes.com/wp-login.php?action=logout&amp;redirect_to=https%3A%2F%2Ftechmarket.madrasthemes.com%2Fmy-account%2F&amp;_wpnonce=9672074694">
          Log out
        </a>
        )
      </p>

      <p>
        From your account dashboard you can view your
        <a href="https://techmarket.madrasthemes.com/my-account/orders/">
          recent orders
        </a>
        , manage your
        <a href="https://techmarket.madrasthemes.com/my-account/edit-address/">
          shipping and billing addresses
        </a>
        , and
        <a href="https://techmarket.madrasthemes.com/my-account/edit-account/">
          edit your password and account details
        </a>
        .
      </p>
    </div>
  );
}
