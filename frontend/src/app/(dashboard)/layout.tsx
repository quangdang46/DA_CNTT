"use client";
import Footer from "@/shared/components/layouts/Footer";
import HeaderBar from "@/shared/components/layouts/HeaderBar";
import Header from "@/shared/components/ui/Header";
import { store } from "@/shared/state/store";

import React from "react";
import { Provider } from "react-redux";
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <HeaderBar></HeaderBar>
      <Header></Header>
      {children}
      <Footer></Footer>
    </Provider>
  );
}
