"use client";
import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function DepartmentsMenu() {
  const [show, setShow] = React.useState(false);
  return (
    <div id="departments-menu" className="dropdown departments-menu">
      <button
        className="btn dropdown-toggle btn-block"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        onClick={() => setShow(!show)}
      >
        <Menu strokeWidth={1} /> <span>All Function</span>{" "}
        <ChevronDown strokeWidth={1} />
      </button>
      {show && (
        <ul
          id="menu-departments-menu"
          className="dropdown-menu yamm departments-menu-dropdown"
        >
          <li className="highlight menu-item animate-dropdown">
            <Link href="/wishlist" title="Value of the Day">
              Wish List
            </Link>
          </li>
          <li className="highlight menu-item animate-dropdown">
            <Link href="/compare" title="Top 100 Offers">
              Compare
            </Link>
          </li>
          <li className="highlight menu-item animate-dropdown">
            <Link href="/track-order" title="Top 100 Offers">
              Track Order
            </Link>
          </li>
          <li className="highlight menu-item animate-dropdown">
            <Link href="/cart" title="Top 100 Offers">
              Cart
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
