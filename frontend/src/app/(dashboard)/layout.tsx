"use client";
import Footer from "@/shared/components/layouts/Footer";
import HeaderBar from "@/shared/components/layouts/HeaderBar";
import Header from "@/shared/components/ui/Header";
import { queryClient } from "@/shared/config/queryClient";
import { store } from "@/shared/state/store";
import { QueryClientProvider } from "@tanstack/react-query";

import React from "react";
import { Provider } from "react-redux";
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <HeaderBar></HeaderBar>
        <Header></Header>
        {children}
        <Footer></Footer>
      </Provider>
    </QueryClientProvider>
  );
}
