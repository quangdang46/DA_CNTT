import React from "react";

export default function ProductsCarouselTabs({
  tabs,
}: {
  tabs: { title: string; content: string }[];
}) {
  return (
    <header className="section-header">
      <ul role="tablist" className="nav justify-content-end">
        {tabs.map((tab: { title: string; content: string }, index: number) => (
          <li className="nav-item" key={index}>
            <a
              className={`nav-link ${index === 0 ? "active" : ""}`}
              href={`#tab-${index}`}
              data-toggle="tab"
            >
              {tab.title}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}
