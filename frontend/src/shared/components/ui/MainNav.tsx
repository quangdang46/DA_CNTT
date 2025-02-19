"use client";
import useClickOutside from "@/shared/hooks/useClickOutside";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";

export default function MainNav() {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useClickOutside(dropdownRef, () => setShow(false));

  const toggleDropdown = () => setShow((prev) => !prev);
  return (
    <nav
      id="primary-navigation"
      className="primary-navigation"
      aria-label="Primary Navigation"
    >
      <ul id="menu-primary-menu" className="nav yamm">
        <li className="sale-clr yamm-fw menu-item animate-dropdown">
          <Link href="/shop" title="Shop">
            SHOP
          </Link>
        </li>
        <li className="menu-item menu-item-has-children animate-dropdown dropdown">
          <Link
            href="#"
            title="Mother's Day"
            aria-haspopup="true"
            onClick={toggleDropdown}
            aria-expanded={show}
          >
            FUNCTION
            <ChevronDown strokeWidth={1} />
          </Link>
          <ul
            role="menu"
            className="dropdown-menu"
            style={{ display: show ? "block" : "none" }}
            ref={dropdownRef}
          >
            <li className="menu-item animate-dropdown">
              <Link href="/wishlist" title="Wishlist">
                Wishlist
              </Link>
            </li>
            <li className="menu-item animate-dropdown">
              <Link href="/compare" title="Wishlist">
                Compare
              </Link>
            </li>
            <li className="menu-item animate-dropdown">
              <Link href="/track-order" title="Wishlist">
                Track Order
              </Link>
            </li>
          </ul>
        </li>
        <li className="menu-item animate-dropdown">
          <Link href="/checkout" title="Check out">
            Check out
          </Link>
        </li>
        <li className="menu-item animate-dropdown">
          <Link href="/track-order" title="Shop">
            Track Order
          </Link>
        </li>
      </ul>
    </nav>
  );
}
