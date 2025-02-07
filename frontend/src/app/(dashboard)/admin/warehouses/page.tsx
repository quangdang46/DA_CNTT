"use client";

import Pagination from "@/shared/components/ui/Admin/Pagination/Pagination";
import Search from "@/shared/components/ui/Admin/Search/Search";
import styles from "@/shared/components/ui/Admin/Warehouse/warehouse.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const warehouseData = [
  {
    id: "111",
    productName: "iPhone 16 Pro Max 256GB",
    supplier: "Apple Vietnam",
    totalAmount: "$10000",
    date: "13.01.25",
    quantity: 100,
    employee: "NV001",
    productImage:
      "https://plus.unsplash.com/premium_photo-1671209879721-40e4f468bee1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "112",
    productName: "Samsung Galaxy S22 Ultra",
    supplier: "Samsung Electronics",
    totalAmount: "$8000",
    date: "14.01.25",
    quantity: 150,
    employee: "NV002",
    productImage:
      "https://plus.unsplash.com/premium_photo-1671209879721-40e4f468bee1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "113",
    productName: "Sony Xperia 1 IV",
    supplier: "Sony Corporation",
    totalAmount: "$12000",
    date: "15.01.25",
    quantity: 80,
    employee: "NV003",
    productImage:
      "https://plus.unsplash.com/premium_photo-1671209879721-40e4f468bee1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "114",
    productName: "Google Pixel 7 Pro",
    supplier: "Google",
    totalAmount: "$9500",
    date: "16.01.25",
    quantity: 120,
    employee: "NV004",
    productImage:
      "https://plus.unsplash.com/premium_photo-1671209879721-40e4f468bee1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "115",
    productName: "OnePlus 10 Pro",
    supplier: "OnePlus",
    totalAmount: "$7000",
    date: "17.01.25",
    quantity: 200,
    employee: "NV005",
    productImage:
      "https://plus.unsplash.com/premium_photo-1671209879721-40e4f468bee1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "116",
    productName: "Xiaomi Mi 11 Ultra",
    supplier: "Xiaomi",
    totalAmount: "$6000",
    date: "18.01.25",
    quantity: 250,
    employee: "NV006",
    productImage:
      "https://plus.unsplash.com/premium_photo-1671209879721-40e4f468bee1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const WarehousePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const warehousesPerPage = 5;

  const indexOfLastWarehouse = currentPage * warehousesPerPage;
  const indexOfFirstWarehouse = indexOfLastWarehouse - warehousesPerPage;
  const currentWarehouse = warehouseData.slice(
    indexOfFirstWarehouse,
    indexOfLastWarehouse
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Warhousing</h2>
      <div className={styles.top}>
        <Search placeholder="Search for warhousing..." />
        <Link href="/admin/warehouses/add">
          <button className={styles.addButton}>Add New Warhouse</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>ID</td>
            <td>Name Product</td>
            <td>Supplier</td>
            <td>Total Amount</td>
            <td>Date</td>
            <td>Quantity</td>
            <td>Employee</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {currentWarehouse.map((warehouseData) => (
            <tr key={warehouseData.id}>
              <td>#{warehouseData.id}</td>
              <td>
                <div className={styles.product}>
                  <Image
                    src={warehouseData.productImage}
                    alt={warehouseData.productName}
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                  <div className={styles.productName}>
                    {warehouseData.productName}
                  </div>
                </div>
              </td>
              <td className={styles.supplier}>{warehouseData.supplier}</td>
              <td>{warehouseData.totalAmount}</td>
              <td>{warehouseData.date}</td>
              <td>{warehouseData.quantity}</td>
              <td>{warehouseData.employee}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/admin/warehouses/${warehouseData.id}`}>
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
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(warehouseData.length / warehousesPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default WarehousePage;
