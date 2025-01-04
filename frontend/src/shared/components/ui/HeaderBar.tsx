import { Container, Nav, NavItem } from "react-bootstrap";
import React from "react";
import Link from "next/link";
import { headerBarItems } from "@/shared/constants";

export default function HeaderBar() {
  return (
    <div className="top-bar top-bar-v1">
      <Container className="col-full">
        <Nav id="menu-top-bar-left" className="nav justify-content-center">
          {headerBarItems.map((link, index) => (
            <NavItem key={index} className="menu-item animate-dropdown">
              <Link href={link.url} title={link.title}>
                {link.content}
              </Link>
            </NavItem>
          ))}
        </Nav>
      </Container>
    </div>
  );
}
