import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Row,
  Navbar,
  Nav,
  NavDropdown,
  NavItem,
  DropdownItem,
  NavbarToggle,
} from "react-bootstrap";

export default function Header() {
  return (
    <header
      id="masthead"
      className="site-header header-v1"
      style={{ backgroundImage: "none" }}
    >
      <div className="col-full desktop-only">
        <div className="techmarket-sticky-wrap">
          <Row>
            {/* logo */}
            <div className="site-branding">
              <Link href="/" className="custom-logo-link" rel="home">
                <Image
                  src="https://images.unsplash.com/photo-1496200186974-4293800e2c20?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="custom-logo"
                  alt="Techmarket"
                  width={150}
                  height={30}
                />
              </Link>
            </div>

            {/* logo */}

            {/* content */}

            <Navbar
              id="primary-navigation"
              className="primary-navigation"
              aria-label="Primary Navigation"
              expand="lg"
            >
              <Nav className="nav yamm">
                <NavItem className="sale-clr yamm-fw menu-item animate-dropdown">
                  <Link href="/product-category" title="Super deals">
                    Super deals
                  </Link>
                </NavItem>
                <NavDropdown
                  title="Mother's Day"
                  id="mother-day-dropdown"
                  className="menu-item menu-item-has-children animate-dropdown"
                >
                  <DropdownItem as={Link} href="/wishlist" title="Wishlist">
                    Wishlist
                  </DropdownItem>
                  <DropdownItem as={Link} href="/wishlist" title="Wishlist">
                    Wishlist
                  </DropdownItem>
                </NavDropdown>
                <NavItem className="menu-item animate-dropdown">
                  <Link href="/product-category" title="Logitech Sale">
                    Logitech Sale
                  </Link>
                </NavItem>
                <NavItem className="menu-item animate-dropdown">
                  <Link href="/product-category" title="Headphones Sale">
                    Headphones Sale
                  </Link>
                </NavItem>
                <NavDropdown
                  title="..."
                  id="more-menu-dropdown"
                  className="techmarket-flex-more-menu-item dropdown"
                >
                  <DropdownItem href="#" title="More options">
                    More options
                  </DropdownItem>
                  {/* <NavDropdown.Menu className="overflow-items dropdown-menu" /> */}
                </NavDropdown>
              </Nav>
            </Navbar>
            {/* content */}
          </Row>
        </div>
        {/* "duoi" */}
      </div>
    </header>
  );
}
