"use client";
import { useWishlist } from "@/shared/hooks/useWishlist";
import { Heart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null; // Hoặc render một spinner/loading
  }
  return (
    <ul className="header-wishlist nav navbar-nav">
      <li className="nav-item">
        <Link href="/wishlist" className="nav-link">
          <Heart strokeWidth={1} />
          <span id="top-cart-wishlist-count" className="value">
            {wishlist.length}
          </span>
        </Link>
      </li>
    </ul>
  );
}
