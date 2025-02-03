import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/warehouse/warehouse.module.css";
import Image from "next/image";
import Link from "next/link";

const WarehousePage = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Warhousing</h2>
      <div className={styles.top}>
        <Search placeholder="Search for warhousing..." />
        <Link href="/dashboard/warehouses/add">
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
          <tr>
            <td>#111</td>
            <td>
              <div className={styles.product}>
                <Image
                  src="/noproduct.jpg"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.productImage}
                />
                iPhone 16 Pro Max 256GB
              </div>
            </td>
            <td>Apple Vietnam</td>
            <td>$10000</td>
            <td>13.01.2025</td>
            <td>100</td>
            <td>NV001</td>
            <td>
              <div className={styles.buttons}>
                <Link href="/dashboard/warehouses/test">
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

          <tr>
            <td>#111</td>
            <td>
              <div className={styles.product}>
                <Image
                  src="/noproduct.jpg"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.productImage}
                />
                iPhone 16 Pro Max 256GB
              </div>
            </td>
            <td>Apple Vietnam</td>
            <td>$10000</td>
            <td>13.01.2025</td>
            <td>100</td>
            <td>NV001</td>
            <td>
              <div className={styles.buttons}>
                <Link href="/dashboard/warehouses/test">
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
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default WarehousePage;
