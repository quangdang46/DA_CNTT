"use client";

import { useTabs } from "@/shared/contexts/TabsContext";
import React, { useEffect } from "react";

interface Props {
  navigationLists: {
    label: string;
    type: string;
    icon: React.ReactNode;
  }[];
}
export default function NavigationAccount({ navigationLists }: Props) {
  const { activeTab, setActiveTab } = useTabs();
  useEffect(() => {
    setActiveTab("account-dashboard");
  }, [setActiveTab]);
  return (
    <nav
      className="woocommerce-MyAccount-navigation"
      aria-label="Account pages"
    >
      <ul>
        {navigationLists.map((tab, index) => (
          <li key={index} className="woocommerce-MyAccount-navigation-link">
            <div
              className={`d-flex justify-content-between align-items-center ${
                activeTab === tab.type && "is-active"
              }`}
              onClick={() => setActiveTab(tab.type)}
              style={{ cursor: "pointer" }}
            >
              {tab.label} {tab.icon}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
