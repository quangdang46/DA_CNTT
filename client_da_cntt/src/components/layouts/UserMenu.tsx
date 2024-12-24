import { ModeToggle } from '@/components/common/ModeToggle';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { BadgeDollarSign, Car, ChevronDown, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export default function UserMenu() {
  return (
    <ul className="ml-auto flex items-center justify-center gap-5 text-sm font-light">
      <li className="">
        <Link href="#" className="flex items-center justify-center gap-1">
          <Car />
          <span>Car</span>
        </Link>
      </li>
      <li className="border-l border-gray-300 pl-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none flex items-center justify-center gap-1">
            <BadgeDollarSign />
            <span>Dolar (USD)</span>
            <ChevronDown></ChevronDown>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Profile</span>
              </DropdownMenuItem>{" "}
              <DropdownMenuItem>
                <span>Profile</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </li>
      <li className="border-l border-gray-300 pl-4">
        <Link href="#" className="flex items-center justify-center gap-1">
          <User />
          <span>Register or Sign in</span>
        </Link>
      </li>
      <li className="border-l border-gray-300 pl-4">
        <ModeToggle />
      </li>
    </ul>
  );
}
