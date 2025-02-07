import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import {
  BadgeHelp,
  Banknote,
  Bolt,
  BookMarked,
  ChartArea,
  CircleUser,
  Handshake,
  History,
  LayoutDashboard,
  LogOut,
  ShoppingBag,
} from "lucide-react";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/admin",
        icon: <LayoutDashboard />,
      },
      {
        title: "Users",
        path: "/admin/users",
        icon: <CircleUser />,
      },
      {
        title: "Products",
        path: "/admin/products",
        icon: <ShoppingBag />,
      },
      {
        title: "Transactions",
        path: "/admin/transactions",
        icon: <Banknote />,
      },
      {
        title: "History",
        path: "/admin/orderhistory",
        icon: <History />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/admin/revenue",
        icon: <BookMarked />,
      },
      {
        title: "Warehouse",
        path: "/admin/warehouses",
        icon: <ChartArea />,
      },
      {
        title: "Teams",
        path: "/admin/teams",
        icon: <Handshake />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/admin/settings",
        icon: <Bolt />,
      },
      {
        title: "Help",
        path: "/admin/help",
        icon: <BadgeHelp />,
      },
    ],
  },
];

const Sidebar = () => {
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
      <button className={styles.logout}>
        <LogOut />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
