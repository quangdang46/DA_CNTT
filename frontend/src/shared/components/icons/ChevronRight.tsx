import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import IconType from "@/shared/types/IconTypes";

export default function ChevronRight({ color = "black", size = "1x" }: IconType) {
  return (
    <FontAwesomeIcon
      icon={faChevronRight}
      size={size}
      color={color}
    ></FontAwesomeIcon>
  );
}
