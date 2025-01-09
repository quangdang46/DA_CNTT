import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import IconType from "@/shared/types/IconTypes";

export default function ChevronLeft({ color = "black", size = "1x" }: IconType) {
  return (
    <FontAwesomeIcon
      icon={faChevronLeft}
      size={size}
      color={color}
    ></FontAwesomeIcon>
  );
}
