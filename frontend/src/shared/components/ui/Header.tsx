
import React from "react";
import DepartmentsMenu from "@/shared/components/ui/DepartmentsMenu";
import NavbarSearch from "@/shared/components/ui/NavbarSearch ";
import Compare from "@/shared/components/ui/Compare";
import Wishlist from "@/shared/components/ui/Wishlist";
import Cart from "@/shared/components/ui/Cart";
import StickyHeader from "@/shared/components/ui/StickyHeader";

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
    </header>
  );
}
