import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableList } from "@fortawesome/free-solid-svg-icons";
import IconType from "@/shared/types/IconTypes";

export default function GridSmall({ color = "black", size = "1x", className = "" }: IconType) {
  return (
    <FontAwesomeIcon
      icon={faTableList}
      size={size}
      color={color}
      className={className}
    ></FontAwesomeIcon>
  );
}
