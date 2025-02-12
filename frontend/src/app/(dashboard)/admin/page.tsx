"use client";
import React from "react";
import styles from "@/shared/style/Admin/dashboard.module.css";
import Card from "@/shared/components/ui/Admin/Card/Card";
import Transactions from "@/shared/components/ui/Admin/Transactions/Transactions";
import Chart from "@/shared/components/ui/Admin/Chart/Chart";
import adminApiRequest from "@/shared/apiRequests/admin";
import { ListOrdered, ShoppingCart, User } from "lucide-react";
import { DashboardType } from "@/shared/types/AdminTypes";

export default function page() {
  const { data, isLoading } = adminApiRequest.useGetDashboard();
  const dashboard = data?.data as DashboardType;

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card
            title="Total Users"
            number={dashboard?.totalUser}
            icon={<User />}
          />
          <Card
            title="Total Product"
            number={dashboard?.totalProduct}
            icon={<ShoppingCart />}
          />
          <Card
            title="Total Order"
            number={dashboard?.totalOrder}
            icon={<ListOrdered />}
          />
        </div>
        <Transactions payments={dashboard?.payment} />
        <Chart />
      </div>
    </div>
  );
}
