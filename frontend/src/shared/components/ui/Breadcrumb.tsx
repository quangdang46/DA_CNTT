import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Breadcrumb() {
  return (
    <nav className="woocommerce-breadcrumb">
      <Link href="/">Home</Link>
      <span className="delimiter">
        <ChevronRight strokeWidth={1} />
      </span>
      My Account
    </nav>
  );
}
