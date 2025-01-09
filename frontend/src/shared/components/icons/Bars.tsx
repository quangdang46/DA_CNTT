import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import IconType from "@/shared/types/IconTypes";

export default function Bars({ color = "black", size = "1x" }: IconType) {
  return <FontAwesomeIcon icon={faBars} size={size} color={color}></FontAwesomeIcon>;
}
