// import { ChevronRight } from "lucide-react";
// import Link from "next/link";
// import React from "react";

// export default function Breadcrumb() {
//   return (
//     <nav className="woocommerce-breadcrumb">
//       <Link href="/">Home</Link>
//       <span className="delimiter">
//         <ChevronRight strokeWidth={1} />
//       </span>
//       My Account
//     </nav>
//   );
// }

"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumb() {
  const pathname = usePathname(); // Lấy pathname hiện tại
  const pathNames = pathname.split("/").filter((path) => path); // Chia pathname thành các phần tử con

  return (
    <nav className="woocommerce-breadcrumb">
      <Link href="/">Home</Link>
      {pathNames.map((link, index) => {
        const href = `/${pathNames.slice(0, index + 1).join("/")}`;
        const itemLink = link[0].toUpperCase() + link.slice(1); // Viết hoa chữ cái đầu tiên của mỗi phần tử link


        return (
          <React.Fragment key={index}>
            {/* Thêm separator chỉ nếu không phải phần tử cuối */}
            <span className="delimiter">
              {index > 0 && <ChevronRight strokeWidth={1} />}
            </span>
            <Link href={href}>{itemLink}</Link>
          </React.Fragment>
        );
      })}
    </nav>
  );
}
