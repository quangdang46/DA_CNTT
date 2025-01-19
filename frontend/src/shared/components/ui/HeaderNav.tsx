import Car from "@/shared/components/icons/Car";
import ChevronDown from "@/shared/components/icons/ChevronDown";
import DollarSign from "@/shared/components/icons/DollarSign";
import User from "@/shared/components/icons/User";
import Link from "next/link";
import React from "react";
import { DropdownItem, Nav, NavDropdown, NavItem } from "react-bootstrap";

export default function HeaderNav() {
  return (
    <Nav
      id="secondary-navigation"
      className="secondary-navigation"
      aria-label="Secondary Navigation"
      data-nav="flex-menu"
    >
      <NavItem>
        <Link href="track-your-order.html" className="nav-link">
          <Car></Car> Track Your Order
        </Link>
      </NavItem>

      <NavDropdown
        title={
          <>
            <DollarSign></DollarSign> Dollar (US) <ChevronDown></ChevronDown>
          </>
        }
        id="currency-dropdown"
      >
        <DropdownItem href="#">AUD</DropdownItem>
        <DropdownItem href="#">INR</DropdownItem>
        <DropdownItem href="#">AED</DropdownItem>
        <DropdownItem href="#">SGD</DropdownItem>
      </NavDropdown>

      <NavItem>
        {user ? (
          <Link href="my-account.html" className="nav-link">
            <User></User> {user.name}
          </Link>
        ) : (
          <Link href="/authentication" className="nav-link">
            <User></User> Register or Sign in
          </Link>
        )}
      </NavItem>
    </Nav>
  );
}
