"use client";
import User from "@/shared/components/icons/User";
import WrapperContent from "@/shared/components/layouts/WrapperContent";
import AddressTab from "@/shared/components/ui/Account/AddressTab";
import DashboardTab from "@/shared/components/ui/Account/DashboardTab";
import DetailsTab from "@/shared/components/ui/Account/DetailsTab";
import LogoutTab from "@/shared/components/ui/Account/LogoutTab";
import NavigationAccount from "@/shared/components/ui/Account/NavigationAccount";
import OrdersTab from "@/shared/components/ui/Account/OrdersTab";
import { TabsProvider } from "@/shared/contexts/TabsContext";
import React from "react";

export default function Page() {
  const navigationLists = [
    {
      label: "Dashboard",
      type: "account-dashboard",
      icon: <User />,
    },
    {
      label: "Orders",
      type: "account-orders",
      icon: <User />,
    },

    {
      label: "Addresses",
      type: "account-address",
      icon: <User />,
    },
    {
      label: "Account details",
      type: "account-details",
      icon: <User />,
    },
    {
      label: "Log out",
      type: "account-logout",
      icon: <User />,
    },
  ];
  return (
    <div>
      <WrapperContent className="page-template-default page page-id-7 logged-in theme-techmarket kc-css-system woocommerce-account woocommerce-page woocommerce-js group-blog can-uppercase user-logged-in woocommerce-active  pace-done">
        <div className="page type-page status-publish hentry">
          <header className="entry-header">
            <div className="page-header-caption">
              <h1 className="entry-title">My Account</h1>
            </div>
          </header>

          <div className="entry-content">
            <div className="woocommerce">
              <TabsProvider>
                <NavigationAccount
                  navigationLists={navigationLists}
                ></NavigationAccount>
                <DashboardTab />
                <AddressTab />
                <DetailsTab />
                <OrdersTab />
                <LogoutTab />
              </TabsProvider>
            </div>
          </div>
        </div>
      </WrapperContent>
    </div>
  );
}
