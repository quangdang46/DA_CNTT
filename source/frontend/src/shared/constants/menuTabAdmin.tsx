import {
  Banknote,
  CircleUser,
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

];
