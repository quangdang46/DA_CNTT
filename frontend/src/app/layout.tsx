"use client"; // Thêm dòng này để đánh dấu đây là Client Component
import "bootstrap/dist/css/bootstrap.min.css";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import "./globals.css";
import "./admin.css";
import "./customize.css";
import { ToastContainer } from "react-toastify";
import { queryClient } from "@/shared/config/queryClient";
import { store } from "@/shared/state/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ToastContainer></ToastContainer>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>{children}</Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
