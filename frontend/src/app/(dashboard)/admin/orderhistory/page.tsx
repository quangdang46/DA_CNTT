"use client";

import styles from "@/shared/components/ui/Admin/OrderHistory/orderhistory.module.css";
import Pagination from "@/shared/components/ui/Admin/Pagination/Pagination";
import Search from "@/shared/components/ui/Admin/Search/Search";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const orders = [
  {
    id: "12345",
    transactionId: "123",
    customer: "John Doe",
    avatar: "/static/images/avatar/noavatar.png",
    paymentMethod: "Credit_Card",
    date: "26.01.25",
    total: "$3,200",
  },
  {
    id: "12346",
    transactionId: "124",
    customer: "Jane Smith",
    avatar: "/static/images/avatar/noavatar.png",
    paymentMethod: "PayPal",
    date: "27.01.25",
    total: "$1,450",
  },
  {
    id: "12347",
    transactionId: "125",
    customer: "Robert Brown",
    avatar: "/static/images/avatar/noavatar.png",
    paymentMethod: "Credit_Card",
    date: "28.01.25",
    total: "$2,800",
  },
  {
    id: "12348",
    transactionId: "126",
    customer: "Emily Davis",
    avatar: "/static/images/avatar/noavatar.png",
    paymentMethod: "Credit_Card",
    date: "29.01.25",
    total: "$4,600",
  },
  {
    id: "12349",
    transactionId: "127",
    customer: "Michael Johnson",
    avatar: "/static/images/avatar/noavatar.png",
    paymentMethod: "Bank_Transfer",
    date: "30.01.25",
    total: "$1,200",
  },
  {
    id: "12350",
    transactionId: "128",
    customer: "Sophia Wilson",
    avatar: "/static/images/avatar/noavatar.png",
    paymentMethod: "Credit_Card",
    date: "31.01.25",
    total: "$5,400",
  },
  {
    id: "12351",
    transactionId: "129",
    customer: "Liam Martinez",
    avatar: "/static/images/avatar/noavatar.png",
    paymentMethod: "PayPal",
    date: "01.02.25",
    total: "$2,500",
  },
  {
    id: "12352",
    transactionId: "130",
    customer: "Olivia Garcia",
    avatar: "/static/images/avatar/noavatar.png",
    paymentMethod: "Credit_Card",
    date: "02.02.25",
    total: "$3,000",
  },
  {
    id: "12353",
    transactionId: "131",
    customer: "Noah Hernandez",
    avatar: "/static/images/avatar/noavatar.png",
    paymentMethod: "PayPal",
    date: "03.02.25",
    total: "$6,700",
  },
  {
    id: "12354",
    transactionId: "132",
    customer: "Isabella Lopez",
    avatar: "/static/images/avatar/noavatar.png",
    paymentMethod: "Bank_Transfer",
    date: "04.02.25",
    total: "$7,800",
  },
];

const OrderHistoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; // Hiển thị 5 đơn hàng mỗi trang

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className={styles.containerPage}>
      <div className={styles.top}>
        <Search placeholder="Search for a history..." />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td style={{ whiteSpace: "nowrap" }}>Hist ID</td>
            <td style={{ whiteSpace: "nowrap" }}>Trans ID</td>
            <td>Customer</td>
            <td>Payment Method</td>
            <td>Date</td>
            <td>Total</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>#{order.transactionId}</td>
              <td>
                <div className={styles.user}>
                  <Image
                    src={order.avatar}
                    alt={order.customer}
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {order.customer}
                </div>
              </td>
              <td>
                <span
                  className={`${styles.status} ${styles[order.paymentMethod]}`}
                >
                  {order.paymentMethod}
                </span>
              </td>
              <td>{order.date}</td>
              <td>{order.total}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/admin/orderhistory/${order.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <button className={`${styles.button} ${styles.delete}`}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(orders.length / ordersPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default OrderHistoryPage;
