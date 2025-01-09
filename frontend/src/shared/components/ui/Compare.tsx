import CompareIcon from "@/shared/components/icons/CompareIcon";
import Link from "next/link";
import React from "react";

export default function Compare() {
  return (
    <ul className="header-compare nav navbar-nav">
      <li className="nav-item">
        <Link href="/compare" className="nav-link">
            <CompareIcon size="2x"></CompareIcon>
          <span id="top-cart-compare-count" className="value">
            3
          </span>
        </Link>
      </li>
    </ul>
  );
}
