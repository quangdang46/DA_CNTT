import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import IconType from "@/shared/types/IconTypes";

export default function CloseIcon({
  color = "black",
  size = "1x",
  className = "",
}: IconType) {
  return (
    <FontAwesomeIcon
      icon={faClose}
      size={size}
      color={color}
      className={className}
    ></FontAwesomeIcon>
  );
}
