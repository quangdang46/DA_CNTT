import MainNav from "@/shared/components/ui/MainNav";
import HeaderNav from "@/shared/components/ui/HeaderNav";
import React from "react";
import { Row } from "react-bootstrap";
import SiteBranding from "@/shared/components/ui/SiteBranding";
import DepartmentsMenu from "@/shared/components/ui/DepartmentsMenu";
import NavbarSearch from "@/shared/components/ui/NavbarSearch ";
import Compare from "@/shared/components/ui/Compare";
import Wishlist from "@/shared/components/ui/Wishlist";
import Cart from "@/shared/components/ui/Cart";

export default function Header() {
  return (
    <header
      id="masthead"
      className="site-header header-v1"
      style={{ backgroundImage: "none" }}
    >
      <div className="col-full desktop-only">
        <div className="sticky-wrapper">
          <div className="techmarket-sticky-wrap">
            <Row>
              <SiteBranding></SiteBranding>
              <MainNav></MainNav>
              <HeaderNav></HeaderNav>
              {/* content */}
            </Row>
          </div>
        </div>

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
    </header>
  );
}
