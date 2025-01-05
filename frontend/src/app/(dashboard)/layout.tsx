import Header from "@/shared/components/ui/Header";
import HeaderBar from "@/shared/components/ui/HeaderBar";

import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderBar></HeaderBar>
      <Header></Header>
      {children}
    </>
  );
}
