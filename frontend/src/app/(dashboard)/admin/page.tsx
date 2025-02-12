import React from "react";
import styles from "@/shared/style/Admin/dashboard.module.css";
import Card from "@/shared/components/ui/Admin/Card/Card";
import Transactions from "@/shared/components/ui/Admin/Transactions/Transactions";
import Chart from "@/shared/components/ui/Admin/Chart/Chart";

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card />
          <Card />
          <Card />
        </div>
        <Transactions />
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
