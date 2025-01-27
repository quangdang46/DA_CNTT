import { GitCompareArrows } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Compare() {
  return (
    <ul className="header-compare nav navbar-nav">
      <li className="nav-item">
        <Link href="/compare" className="nav-link">
          <GitCompareArrows strokeWidth={1} />
          <span id="top-cart-compare-count" className="value">
            3
          </span>
        </Link>
      </li>
    </ul>
  );
}
