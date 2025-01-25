"use client";
import accountApiRequest from "@/shared/apiRequests/account";
import Footer from "@/shared/components/layouts/Footer";
import HeaderBar from "@/shared/components/layouts/HeaderBar";
import Header from "@/shared/components/ui/Header";
import { RootState } from "@/shared/state/store";
import { AccountResType } from "@/shared/types/UserTypes";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { data } = useQuery<Partial<AccountResType>, Error>({
    queryKey: ["user-info"],
    queryFn: async () => {
      if (isLoggedIn) {
        try {
          const response = await accountApiRequest.me();
          if (!response.success) {
            throw new Error(response.message);
          }
          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      } else {
        return { data: { role: "guest" } } as Partial<AccountResType>;
      }
    },
    enabled: isLoggedIn, // Chỉ gọi API khi người dùng đã đăng nhập
  });
  const role = data?.data?.role || "guest";

  if (role === "admin") return <>{children}</>;

  return (
    <>
      <HeaderBar></HeaderBar>
      <Header></Header>
      {children}
      <Footer></Footer>
    </>
  );
}
