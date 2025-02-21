import React from "react";
import DepartmentsMenu from "@/shared/components/ui/DepartmentsMenu";
import NavbarSearch from "@/shared/components/ui/NavbarSearch ";
import Compare from "@/shared/components/ui/Compare";
import Wishlist from "@/shared/components/ui/Wishlist";
import Cart from "@/shared/components/ui/Cart";
import StickyHeader from "@/shared/components/ui/StickyHeader";
import SiteBranding from "@/shared/components/ui/SiteBranding";
import Link from "next/link";
import { CircleUser, Heart, Menu, ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <header
      id="masthead"
      className="site-header header-v1"
      style={{ backgroundImage: "none" }}
    >
      <div className="col-full desktop-only">
        <StickyHeader></StickyHeader>

        {/* ////////////////// */}

        <div className="d-flex justify-content-center align-items-center">
          <DepartmentsMenu></DepartmentsMenu>
          <NavbarSearch></NavbarSearch>

          <>
            <Compare></Compare>
            <Wishlist></Wishlist>
            <Cart></Cart>
          </>
        </div>
      </div>
      {/* mobile */}
      <div className="col-full handheld-only">
        <div className="handheld-header">
          <div className="row">
            <SiteBranding />
            <div className="handheld-header-links">
              <ul className="columns-3">
                <li className="my-account">
                  <Link href="/my-account" className="has-icon">
                    <CircleUser strokeWidth={1} />
                  </Link>
                </li>
                <li className="wishlist">
                  <Link href="/wishlist" className="has-icon">
                    <Heart strokeWidth={1} />
                    <span className="count">3</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="techmarket-sticky-wrap">
            <div className="row">
              <nav
                id="handheld-navigation"
                className="handheld-navigation"
                aria-label="Handheld Navigation"
              >
                <button className="btn navbar-toggler" type="button">
                  <Menu strokeWidth={1} />
                  <span>Menu</span>
                </button>
                <div className="handheld-navigation-menu">
                  <span className="tmhm-close">Close</span>
                  <ul id="menu-departments-menu-1" className="nav">
                    <li className="highlight menu-item animate-dropdown">
                      <a title="Value of the Day" href="shop.html">
                        Value of the Day
                      </a>
                    </li>
                  </ul>
                </div>
                {/* .handheld-navigation-menu */}
              </nav>
              {/* .handheld-navigation */}
              <div className="site-search">
                <div className="widget woocommerce widget_product_search">
                  <form
                    role="search"
                    method="get"
                    className="woocommerce-product-search"
                    action="https:home-v1.html"
                  >
                    <label
                      className="screen-reader-text"
                      htmlFor="woocommerce-product-search-field-0"
                    >
                      Search for:
                    </label>
                    <input
                      type="search"
                      id="woocommerce-product-search-field-0"
                      className="search-field"
                      placeholder="Search products…"
                      defaultValue=""
                      name="s"
                    />
                    <input type="submit" defaultValue="Search" />
                    <input
                      type="hidden"
                      name="post_type"
                      defaultValue="product"
                    />
                  </form>
                </div>
              </div>
              <Link
                className="handheld-header-cart-link has-icon"
                href="/cart"
                title="View your shopping cart"
              >
                <ShoppingCart strokeWidth={1} />
                <span className="count">2</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
