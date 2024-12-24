import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignJustify, ChevronDown, Mail, MessageSquare, Plus, PlusCircle, UserPlus, Users } from "lucide-react";

// interface DropdownItem {
//   label: string;
//   icon?: React.ReactNode;
// }

// interface DropdownMenuComponentProps {
//   title: React.ReactNode;
//   items: DropdownItem[][];
// }

// const DropdownMenuComponent: React.FC<DropdownMenuComponentProps> = ({
//   title,
//   items,
// }) => (
//   <DropdownMenu>
//     <DropdownMenuTrigger className="flex items-center justify-center gap-2 border-2 p-4 rounded-sm">
//       {title}
//       <ChevronDown />
//     </DropdownMenuTrigger>
//     <DropdownMenuContent className="w-56">
//       {items.map((group, index) => (
//         <DropdownMenuGroup key={index}>
//           {group.map((item, idx) => (
//             <DropdownMenuItem key={idx}>
//               {item.icon}
//               <span>{item.label}</span>
//             </DropdownMenuItem>
//           ))}
//         </DropdownMenuGroup>
//       ))}
//     </DropdownMenuContent>
//   </DropdownMenu>
// );

// export default DropdownMenuComponent;



import React from 'react'

export default function DropdownMenuComponent() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none flex items-center justify-center gap-2 border-solid border-2 p-4 rounded-sm">
        <AlignJustify />
        <span>All deparments</span>
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

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Users />
            <span>Team</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus />
              <span>Invite users</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Mail />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare />
                  <span>Message</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusCircle />
                  <span>More...</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Plus />
            <span>New Team</span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

