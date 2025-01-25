import React from "react";
import DepartmentsMenu from "@/shared/components/ui/DepartmentsMenu";
import NavbarSearch from "@/shared/components/ui/NavbarSearch ";
import Compare from "@/shared/components/ui/Compare";
import Wishlist from "@/shared/components/ui/Wishlist";
import Cart from "@/shared/components/ui/Cart";
import StickyHeader from "@/shared/components/ui/StickyHeader";
import SiteBranding from "@/shared/components/ui/SiteBranding";
import Car from "@/shared/components/icons/Car";

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
          {/* right */}

          <>
            <Compare></Compare>
            <Wishlist></Wishlist>
            <Cart></Cart>
          </>
        </div>
      </div>
      <div className="col-full handheld-only">
        <div className="handheld-header">
          <div className="row">
            <SiteBranding />
            <div className="handheld-header-links">
              <ul className="columns-3">
                <li className="my-account">
                  <a href="login-and-register.html" className="has-icon">
                    <Car />
                  </a>
                </li>
                <li className="wishlist">
                  <a href="wishlist.html" className="has-icon">
                    <Car />
                    <span className="count">3</span>
                  </a>
                </li>
              </ul>
              {/* .columns-3 */}
            </div>
            {/* .handheld-header-links */}
          </div>
          {/* /.row */}
          <div className="techmarket-sticky-wrap">
            <div className="row">
              <nav
                id="handheld-navigation"
                className="handheld-navigation"
                aria-label="Handheld Navigation"
              >
                <button className="btn navbar-toggler" type="button">
                  <Car />
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
                {/* .widget */}
              </div>
              {/* .site-search */}
              <a
                className="handheld-header-cart-link has-icon"
                href="cart.html"
                title="View your shopping cart"
              >
                <Car />
                <span className="count">2</span>
              </a>
            </div>
            {/* /.row */}
          </div>
          {/* .techmarket-sticky-wrap */}
        </div>
      </div>
    </header>
  );
}
