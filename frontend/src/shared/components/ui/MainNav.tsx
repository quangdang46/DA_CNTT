import ChevronDown from '@/shared/components/icons/ChevronDown';
import Link from 'next/link';
import React from 'react'

export default function MainNav() {
  return (
    <nav
      id="primary-navigation"
      className="primary-navigation"
      aria-label="Primary Navigation"
      data-nav="flex-menu"
    >
      <ul id="menu-primary-menu" className="nav yamm">
        <li className="sale-clr yamm-fw menu-item animate-dropdown">
          <Link href="/product-category" title="Super deals">
            Super deals
          </Link>
        </li>
        <li className="menu-item menu-item-has-children animate-dropdown dropdown">
          <Link href="#" title="Mother's Day" aria-haspopup="true">
            Mother’s Day
            <ChevronDown></ChevronDown>
          </Link>
          <ul role="menu" className="dropdown-menu">
            <li className="menu-item animate-dropdown">
              <Link href="/wishlist" title="Wishlist">
                Wishlist
              </Link>
            </li>
            <li className="menu-item animate-dropdown">
              <Link href="/wishlist" title="Wishlist">
                Wishlist
              </Link>
            </li>
          </ul>
        </li>
        <li className="menu-item animate-dropdown">
          <Link href="/product-category" title="Logitech Sale">
            Logitech Sale
          </Link>
        </li>
        <li className="menu-item animate-dropdown">
          <Link href="/product-category" title="Headphones Sale">
            Headphones Sale
          </Link>
        </li>
      </ul>
    </nav>
  );
}
