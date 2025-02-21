"use client";
import { RootState } from "@/shared/state/store";
import {
  CircleUser,
  Truck,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {  Nav, NavItem } from "react-bootstrap";
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
        <Link href="/track-order" className="nav-link">
          <Truck strokeWidth={1} /> Track Your Order
        </Link>
      </NavItem>
      <NavItem>
        <Link
          href={isLoggedIn ? "/my-account" : "/authentication"}
          className="nav-link"
        >
          <CircleUser strokeWidth={1} />{" "}
          <span>{isLoggedIn ? user?.name : "Login or Register"}</span>
        </Link>
      </NavItem>
    </Nav>
  );
}
