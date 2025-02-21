import React from "react";
import styles from "@/shared/components/ui/Admin/Revenue/revenue.module.css";
import RevenuePage from "@/shared/components/ui/Admin/RevenueChart/RevenueChart";
import RevenueDayChart from "@/shared/components/ui/Admin/RevenueDayChart/RevenueDayChart";
import BestSellingPage from "@/shared/components/ui/Admin/bestSelling/BestSelling";
const Dashboard = () => {
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.mainLeft}>
          <RevenuePage />
        </div>
        <div className={styles.mainRight}>
          <RevenueDayChart />
        </div>
      </div>
      <div className={styles.hotSale}>
        <BestSellingPage />
      </div>
    </div>
  );
};

export default Dashboard;
