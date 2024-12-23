import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import React from "react";

interface DropdownMenuTriggerCustomProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuTrigger> {
  children: React.ReactNode;
}

const DropdownMenuTriggerCustom: React.FC<DropdownMenuTriggerCustomProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <DropdownMenuTrigger className={className} {...props}>
      {children}
    </DropdownMenuTrigger>
  );
};

export default DropdownMenuTriggerCustom;
