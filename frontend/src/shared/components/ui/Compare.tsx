"use client";
import { RootState } from "@/shared/state/store";
import { GitCompareArrows } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Compare() {
  const [isHydrated, setIsHydrated] = useState(false);
  const selectedProducts = useSelector(
    (state: RootState) => state.compare.selectedProducts
  );
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null; // Hoặc render một spinner/loading
  }
  return (
    <ul className="header-compare nav navbar-nav">
      <li className="nav-item">
        <Link href="/compare" className="nav-link">
          <GitCompareArrows strokeWidth={1} />
          <span id="top-cart-compare-count" className="value">
            {selectedProducts.length}
          </span>
        </Link>
      </li>
    </ul>
  );
}
