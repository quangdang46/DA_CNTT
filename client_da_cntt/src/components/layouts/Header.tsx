
import React from "react";


import WrapperContent from "@/components/common/WrapperContent";
import Logo from "@/components/common/Logo";
import MainMenu from "@/components/layouts/MainMenu";
import UserMenu from "@/components/layouts/UserMenu";
import DropdownMenuComponent from "@/components/customize/DropdownMenuComponent";
import SearchFormComponent from "@/components/customize/SearchFormComponent";
import NotificationComponent from "@/components/customize/NotificationComponent";


export default function Header() {


  return (
    <WrapperContent>
      <header className="lg:block relative ml-auto mr-auto py-2">
        <div className="flex items-center pb-1">
          <Logo />
          <MainMenu />
          <UserMenu />

        </div>
   

        <div className="flex items-center justify-center gap-5">
          <DropdownMenuComponent/>

          <SearchFormComponent/>
          <NotificationComponent/>
          
        </div>
      </header>
    </WrapperContent>
  );
}
