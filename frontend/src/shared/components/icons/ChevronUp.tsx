import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import IconType from "@/shared/types/IconTypes";

export default function ChevronUp({
  color = "black",
  size = "1x",
  className,
}: IconType) {
  return (
    <FontAwesomeIcon
      icon={faChevronUp}
      size={size}
      color={color}
      className={className}
    ></FontAwesomeIcon>
  );
}
