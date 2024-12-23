import BreadCrumb from "@/components/layouts/BreadCrumb";
import Header from "@/components/layouts/Header";
import HeaderBar from "@/components/layouts/HeaderBar";
import React from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderBar />
      <Header />
      <BreadCrumb />
      {children}
    </>
  );
}
