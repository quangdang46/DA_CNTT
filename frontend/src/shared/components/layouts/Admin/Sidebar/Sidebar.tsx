"use client";
import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import { LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/state/store";
import { useEffect, useState } from "react";
import { menuItems } from "@/shared/constants/menuTabAdmin";
import Link from "next/link";

const Sidebar = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [isClient, setIsClient] = useState(false);
  // Đảm bảo rằng chỉ thực hiện trên client
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Không render nội dung này trong SSR
  }
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src="https://images.unsplash.com/photo-1738830656378-c8f96e01ec50?q=80&w=2101&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          width="50"
          height="50"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>John Joe</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <Link
        className={styles.logout}
        href={`/admin/logout?auth_token=${token}`}
      >
        <LogOut />
        Logout
      </Link>
    </div>
  );
};

export default Sidebar;
