import Logo from '@/shared/components/common/Logo';
import Link from 'next/link';
import React from 'react'

export default function SiteBranding() {
  return (
    <div className="site-branding">
      <Link
        href="/"
        className="custom-logo-link"
        aria-label="Trang chủ"
        rel="home"
      >
        <Logo></Logo>
      </Link>
    </div>
  );
}
