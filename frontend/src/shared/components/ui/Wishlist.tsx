import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Wishlist() {
  return (
    <ul className="header-wishlist nav navbar-nav">
      <li className="nav-item">
        <Link href="/wishlist" className="nav-link">
          <Heart strokeWidth={1} />
          <span id="top-cart-wishlist-count" className="value">
            3
          </span>
        </Link>
      </li>
    </ul>
  );
}
