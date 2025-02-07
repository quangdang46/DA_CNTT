"use client";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import { Bell, BookKey, MessageCircle, Search } from "lucide-react";


const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className={styles.container}>
      <div className={styles.title}>{pathname.split("/").pop()}</div>
      <div className={styles.menu}>
        <div className={styles.search}>
          <Search />
          <input type="text" placeholder="Search..." className={styles.input} />
        </div>
        <div className={styles.icons}>
          <MessageCircle size={20} />
          <Bell size={20} />
          <BookKey size={20} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
