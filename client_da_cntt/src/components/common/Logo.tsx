import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function Logo() {
  return (
    <Link href="#" className="custom-logo-link" rel="home">
      <Image
        src="https://suno.vn/blog/wp-content/uploads/2014/12/nike-lich-su-thiet-ke-logo.jpg"
        alt="Logo"
        width={100}
        height={50}
        priority
      />
    </Link>
  );
}
