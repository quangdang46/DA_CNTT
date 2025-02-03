import Link from "next/link";
import styles from "../bestSelling/bestSelling.module.css";
import Image from "next/image";

const BestSellingPage = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Top 5 Selling Products</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Created At</td>
            <td>Sold</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <tr>
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
            <td>100% new server, genuine Apple Vietnam</td>
            <td>$999</td>
            <td>13.01.2025</td>
            <td>116</td>
            <td>
              <div className={styles.buttons}>
                <Link href="/dashboard/products/test">
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
            <td>100% new server, genuine Apple Vietnam</td>
            <td>$999</td>
            <td>13.01.2025</td>
            <td>116</td>
            <td>
              <div className={styles.buttons}>
                <Link href="/dashboard/products/test">
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
            <td>100% new server, genuine Apple Vietnam</td>
            <td>$999</td>
            <td>13.01.2025</td>
            <td>116</td>
            <td>
              <div className={styles.buttons}>
                <Link href="/dashboard/products/test">
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
            <td>100% new server, genuine Apple Vietnam</td>
            <td>$999</td>
            <td>13.01.2025</td>
            <td>116</td>
            <td>
              <div className={styles.buttons}>
                <Link href="/dashboard/products/test">
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
            <td>100% new server, genuine Apple Vietnam</td>
            <td>$999</td>
            <td>13.01.2025</td>
            <td>116</td>
            <td>
              <div className={styles.buttons}>
                <Link href="/dashboard/products/test">
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
    </div>
  );
};

export default BestSellingPage;
