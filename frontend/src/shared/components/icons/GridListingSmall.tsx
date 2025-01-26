import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import IconType from "@/shared/types/IconTypes";

export default function GridListingSmall({
  color = "black",
  size = "1x",
  className = "",
}: IconType) {
  return (
    <FontAwesomeIcon
      icon={faBarsStaggered}
      size={size}
      color={color}
      className={className}
    ></FontAwesomeIcon>
  );
}
