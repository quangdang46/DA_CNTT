"use client";
import Car from "@/shared/components/icons/Car";
import ChevronDown from "@/shared/components/icons/ChevronDown";
import DollarSign from "@/shared/components/icons/DollarSign";
import User from "@/shared/components/icons/User";
import { RootState } from "@/shared/state/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { DropdownItem, Nav, NavDropdown, NavItem } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function HeaderNav() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);
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
        <Link
          href={isLoggedIn ? "/profile" : "/authentication"}
          className="nav-link"
        >
          <User></User>{" "}
          <span>{isLoggedIn ? user?.name : "Login or Register"}</span>
        </Link>
      </NavItem>
    </Nav>
  );
}
