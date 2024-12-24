import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface NavItemProps {
  title: string;
  href?: string; // href có thể không cần thiết cho dropdown
  icon?: React.ReactNode; // Đặt icon là tùy chọn
  isDropdown?: boolean;
  children?: React.ReactNode;
}

export default function NavItem({
  title,
  href,
  icon,
  isDropdown,
  children,
}: NavItemProps) {
  return (
    <li
      className={`flex items-center ${
        isDropdown ? "border-l border-gray-300 pl-4" : ""
      }`}
    >
      {isDropdown ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none flex items-center justify-center gap-1">
            {icon}
            <span>{title}</span>
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">{children}</DropdownMenuContent>
        </DropdownMenu>
      ) : href ? ( // Kiểm tra xem href có tồn tại không
        <Link href={href} className="flex items-center justify-center gap-1">
          {icon}
          <span>{title}</span>
        </Link>
      ) : (
        <span className="flex items-center justify-center gap-1">
          {icon}
          <span>{title}</span>
        </span>
      )}
    </li>
  );
}
