import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import IconType from "@/shared/types/IconTypes";

export default function GridSmallExtended({ color = "black", size = "1x", className = "" }: IconType) {
  return (
    <FontAwesomeIcon
      icon={faListUl}
      size={size}
      color={color}
      className={className}
    ></FontAwesomeIcon>
  );
}
