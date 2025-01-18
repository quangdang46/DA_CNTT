import Car from "@/shared/components/icons/Car";
import ChevronDown from "@/shared/components/icons/ChevronDown";
import DollarSign from "@/shared/components/icons/DollarSign";
import User from "@/shared/components/icons/User";
import { fetchUserData } from "@/shared/state/authSlice";
import { AppDispatch, RootState } from "@/shared/state/store";
import Link from "next/link";
import React, { useEffect } from "react";
import { DropdownItem, Nav, NavDropdown, NavItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function HeaderNav() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    // Kiểm tra token trước khi gọi API
    dispatch(fetchUserData());
  }, [dispatch]); // Chỉ gọi fetchUserData khi token và user thay đổi
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
          <Link href="login-and-register.html" className="nav-link">
            <User></User> Register or Sign in
          </Link>
        )}
      </NavItem>
    </Nav>
  );
}
