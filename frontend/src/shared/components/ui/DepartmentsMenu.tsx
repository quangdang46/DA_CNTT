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
        <Menu strokeWidth={1} /> <span>All Departments</span>{" "}
        <ChevronDown strokeWidth={1} />
      </button>
      {show && (
        <ul
          id="menu-departments-menu"
          className="dropdown-menu yamm departments-menu-dropdown"
        >
          <li className="highlight menu-item animate-dropdown">
            <Link href="/home-v2" title="Value of the Day">
              Value of the Day
            </Link>
          </li>
          <li className="highlight menu-item animate-dropdown">
            <Link href="/home-v3" title="Top 100 Offers">
              Value of the Day
            </Link>
          </li>
          <li className="highlight menu-item animate-dropdown">
            <Link href="/home-v3" title="Top 100 Offers">
              Value of the Day
            </Link>
          </li>
          <li className="highlight menu-item animate-dropdown">
            <Link href="/home-v3" title="Top 100 Offers">
              Value of the Day
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
