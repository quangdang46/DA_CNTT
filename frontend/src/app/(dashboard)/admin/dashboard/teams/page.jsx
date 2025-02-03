import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/teams/teams.module.css";
import Image from "next/image";
import Link from "next/link";

const UsersPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for an employee..." />
        <Link href="/dashboard/teams/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Employee Name</td>
            <td>Email</td>
            <td>Worked At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                Ngoc Linh
              </div>
            </td>
            <td>ngoclinh@gmail.com</td>
            <td>12.12.2002</td>
            <td>IT Support</td>
            <td>
              <span className={`${styles.status} ${styles.active}`}>
                active
              </span>
            </td>
            <td>
              <div className={styles.buttons}>
                <Link href="/dashboard/teams/test">
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
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                Ngoc Linh
              </div>
            </td>
            <td>ngoclinh@gmail.com</td>
            <td>12.12.2002</td>
            <td>Shipper</td>
            <td>
              <span className={`${styles.status} ${styles.inActive}`}>
                inactive
              </span>
            </td>
            <td>
              <div className={styles.buttons}>
                <Link href="/dashboard/teams/test">
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

export default UsersPage;
