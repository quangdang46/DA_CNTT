import { useTabs } from "@/shared/contexts/TabsContext";
import React from "react";
interface PropsTab {
  title: string;
  content: string;
  type: string;
}

export default function ProductsCarouselTabs({ tabs }: { tabs: PropsTab[] }) {
  const { activeTab, setActiveTab } = useTabs();
  return (
    <header className="section-header">
      <ul role="tablist" className="nav justify-content-end">
        {tabs.map((tab: PropsTab, index: number) => (
          <li
            className="nav-item"
            key={index}
            onClick={() => setActiveTab(tab.type)}
            style={{ cursor: "pointer" }}
          >
            <div
              className={`nav-link ${activeTab === tab.type ? "active" : ""}`}
              data-toggle="tab"
            >
              {tab.title}
            </div>
          </li>
        ))}
      </ul>
    </header>
  );
}
