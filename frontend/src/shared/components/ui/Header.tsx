import MainNav from "@/shared/components/ui/MainNav";
import HeaderNav from "@/shared/components/ui/HeaderNav";
import React from "react";
import { Row } from "react-bootstrap";
import SiteBranding from "@/shared/components/ui/SiteBranding";

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
      </div>
    </header>
  );
}
