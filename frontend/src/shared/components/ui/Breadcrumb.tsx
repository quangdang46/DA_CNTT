import ChevronRight from '@/shared/components/icons/ChevronRight';
import Link from 'next/link';
import React from 'react'

export default function Breadcrumb() {
  return (
    <nav className="woocommerce-breadcrumb">
      <Link href="/">
        Home
      </Link>
      <span className="delimiter">
        <ChevronRight></ChevronRight>
      </span>
      My Account
    </nav>
  );
}
