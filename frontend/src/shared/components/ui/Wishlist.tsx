import HeartIcon from "@/shared/components/icons/HeartIcon";
import Link from "next/link";
import React from "react";

export default function Wishlist() {
  return (
    <ul className="header-wishlist nav navbar-nav">
      <li className="nav-item">
        <Link href="/wishlist" className="nav-link">
            <HeartIcon size="2x"></HeartIcon>
          <span id="top-cart-wishlist-count" className="value">
            3
          </span>
        </Link>
      </li>
    </ul>
  );
}
