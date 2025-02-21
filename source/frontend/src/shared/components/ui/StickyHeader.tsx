"use client";
import HeaderNav from "@/shared/components/ui/HeaderNav";
import MainNav from "@/shared/components/ui/MainNav";
import SiteBranding from "@/shared/components/ui/SiteBranding";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";

export default function StickyHeader() {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      // Change 50 to the scroll position you want
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className="sticky-wrapper"
      style={isSticky ? { height: "58.2812px" } : {}}
    >
      <div
        className={`techmarket-sticky-wrap ${
          isSticky ? " stuck animated fadeInDown faster" : ""
        }`}
      >
        <Row>
          <SiteBranding></SiteBranding>
          <MainNav></MainNav>
          <HeaderNav></HeaderNav>
          {/* content */}
        </Row>
      </div>
    </div>
  );
}
