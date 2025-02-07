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
  ShoppingBag,
} from "lucide-react";
export const menuItems = [
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
