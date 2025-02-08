"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "@/shared/components/ui/Admin/Products/product.module.css";
import { useState } from "react";
import Search from "@/shared/components/ui/Admin/Search/Search";
import Pagination from "@/shared/components/ui/Admin/Pagination/Pagination";
import DataTable from "@/shared/components/ui/Admin/Table/DataTable/DataTable";

// const products = [
//   {
//     id: 101,
//     title: "iPhone 16 Pro Max 256GB",
//     description: "100% new server, genuine Apple Vietnam",
//     price: 1499,
//     createdAt: "13.01.25",
//     stock: 50,
//   },
//   {
//     id: 102,
//     title: "Samsung Galaxy S24 Ultra",
//     description: "Latest Samsung flagship with 200MP camera and S Pen",
//     price: 1399,
//     createdAt: "20.01.25",
//     stock: 30,
//   },
//   {
//     id: 103,
//     title: "Google Pixel 9 Pro",
//     description: "Top-tier AI camera and clean Android experience",
//     price: 999,
//     createdAt: "15.12.24",
//     stock: 25,
//   },
//   {
//     id: 104,
//     title: "Xiaomi Mi 14 Ultra",
//     description:
//       "Flagship killer with Leica camera system and great performance",
//     price: 899,
//     createdAt: "10.11.24",
//     stock: 100,
//   },
//   {
//     id: 105,
//     title: "OnePlus 12",
//     description: "Fast charging and excellent display performance",
//     price: 799,
//     createdAt: "01.12.24",
//     stock: 70,
//   },
//   {
//     id: 106,
//     title: "Sony Xperia 1 VI",
//     description: "High-quality 4K display and cinematic camera features",
//     price: 1299,
//     createdAt: "10.01.25",
//     stock: 20,
//   },
//   {
//     id: 107,
//     title: "Oppo Find X6 Pro",
//     description: "Innovative design and Hasselblad camera technology",
//     price: 1099,
//     createdAt: "25.11.24",
//     stock: 40,
//   },
//   {
//     id: 108,
//     title: "Huawei Mate 60 Pro",
//     description: "Top performance with HarmonyOS and satellite communication",
//     price: 1199,
//     createdAt: "20.12.24",
//     stock: 35,
//   },
//   {
//     id: 109,
//     title: "Asus ROG Phone 8 Ultimate",
//     description: "Best gaming phone with high refresh rate and RGB lights",
//     price: 1399,
//     createdAt: "15.11.24",
//     stock: 15,
//   },
//   {
//     id: 110,
//     title: "Vivo X100 Pro+",
//     description: "Advanced imaging capabilities with Zeiss optics",
//     price: 1099,
//     createdAt: "05.12.24",
//     stock: 45,
//   },
// ];

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  // Tính toán dữ liệu phân trang
  // const indexOfLastProduct = currentPage * productsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // const currentProducts = products.slice(
  //   indexOfFirstProduct,
  //   indexOfLastProduct
  // );

  // const handlePageChange = (pageNumber: number) => {
  //   setCurrentPage(pageNumber);
  // };
  const products = [
    { id: 1, name: "iPhone 15", price: 1000, status: "available", rating: 4.5 },
    {
      id: 2,
      name: "Samsung S23",
      price: 900,
      status: "out_of_stock",
      rating: 4.2,
    },
    {
      id: 3,
      name: "MacBook Pro",
      price: 2000,
      status: "available",
      rating: 4.8,
    },
  ];

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "price", label: "Price" },
    { key: "status", label: "Status" },
    { key: "rating", label: "Rating" },
    {
      key: "actions",
      label: "Actions",
      renderCell: (item) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            style={{
              padding: "5px",
              background: "#4CAF50",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => alert(`Editing ${item.name}`)}
          >
            Edit
          </button>
          <button
            style={{
              padding: "5px",
              background: "#f44336",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => alert(`Deleting ${item.name}`)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const filters = [
    { key: "name", type: "text", label: "Product Name" },
    { key: "price", type: "number", label: "Price" },
    {
      key: "status",
      type: "select",
      label: "Status",
      options: [
        { value: "available", label: "Available" },
        { value: "out_of_stock", label: "Out of Stock" },
        { value: "discontinued", label: "Discontinued" },
      ],
    },
    { key: "rating", type: "number", label: "Rating" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a product..." />
        <Link href="/admin/products/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      {/* <table className={styles.table}>
        <thead>
          <tr>
            <td>ID</td>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Created At</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td>#{product.id}</td>
              <td>
                <div className={styles.product}>
                  <Image
                    src={
                      "https://plus.unsplash.com/premium_photo-1671209879721-40e4f468bee1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt=""
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                  <span className={styles.productTitle}>{product.title}</span>
                </div>
              </td>
              <td className={styles.productDescription}>
                {product.description}
              </td>
              <td>${product.price}</td>
              <td>{product.createdAt}</td>
              <td>{product.stock}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/admin/products/${product.id}`}>
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
        totalPages={Math.ceil(products.length / productsPerPage)}
        onPageChange={handlePageChange}
      /> */}
      <DataTable columns={columns} data={products} filters={filters} />
    </div>
  );
};

export default ProductsPage;
