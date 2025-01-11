import Footer from "@/shared/components/layouts/Footer";
import HeaderBar from "@/shared/components/layouts/HeaderBar";
import Header from "@/shared/components/ui/Header";

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
      <Footer></Footer>
    </>
  );
}
