import React from "react";

import styles from "@/shared/style/Admin/dashboard.module.css";
import Sidebar from "@/shared/components/layouts/Admin/Sidebar/Sidebar";
import Navbar from "@/shared/components/layouts/Admin/Navbar/Navbar";
import Footer from "@/shared/components/layouts/Admin/Footer/Footer";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className={styles.adminLayout}>
      <div className={styles.container}>
        <div className={styles.menu}>
          <Sidebar />
        </div>
        <div className={styles.content}>
          <Navbar />
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
