import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/orderhistory/orderhistory.module.css";
import Image from "next/image";
import Link from "next/link";

const OrderHistoryPage = () => {
  return (
    <div className={styles.containerPage}>
      <div className={styles.top}>
        <Search placeholder="Search for a history..." />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Transaction ID</td>
            <td>Customer</td>
            <td>Payment Method</td>
            <td>Date</td>
            <td>Total</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#12345</td>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                John Doe
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.creditCard}`}>
                Credit Card
              </span>
            </td>
            <td>26.01.2025</td>
            <td>$3.200</td>
            <td>
              <div className={styles.buttons}>
                <Link href="/dashboard/orderhistory/test">
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
            <td>#12345</td>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                John Doe
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.eWallet}`}>
                E-Wallets
              </span>
            </td>
            <td>26.01.2025</td>
            <td>$3.200</td>
            <td>
              <div className={styles.buttons}>
                <Link href="/dashboard/orderhistory/test">
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
            <td>#12345</td>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                John Doe
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.gateways}`}>
                Payment Gateways
              </span>
            </td>
            <td>26.01.2025</td>
            <td>$3.200</td>
            <td>
              <div className={styles.buttons}>
                <Link href="/dashboard/orderhistory/test">
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
            <td>#12345</td>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                John Doe
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.creditCard}`}>
                Credit Card
              </span>
            </td>
            <td>26.01.2025</td>
            <td>$3.200</td>
            <td>
              <div className={styles.buttons}>
                <Link href="/dashboard/orderhistory/test">
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
            <td>#12345</td>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                John Doe
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.creditCard}`}>
                Credit Card
              </span>
            </td>
            <td>26.01.2025</td>
            <td>$3.200</td>
            <td>
              <div className={styles.buttons}>
                <Link href="/dashboard/orderhistory/test">
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

export default OrderHistoryPage;
