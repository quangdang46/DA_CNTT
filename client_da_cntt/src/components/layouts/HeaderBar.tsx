import React from "react";
import Link from "next/link"; // Import Link từ Next.js
import { headerBarItems } from "../../shared/constants/headerbar-constant";

function HeaderBar() {
  return (
    <div className="w-screen relative -ml-[50vw] left-1/2 bg-[#f9f9f9] text-sm leading-[2.714em] font-light">
      <div className="flex items-center justify-center relative ml-auto mr-auto max-2xl:flex-col max-2xl:items-center lg:pr-4 md:p-0">
        <ul className="flex items-center justify-center w-full">
          {headerBarItems.map((item, index) => (
            <li key={index} className="leading-8 p-2">
              <Link
                href={item.href}
                title={item.title}
                className={`${
                  index !== 0 ? "border-l border-gray-300 pl-4" : ""
                }`}
              >
                {item.content}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HeaderBar;
