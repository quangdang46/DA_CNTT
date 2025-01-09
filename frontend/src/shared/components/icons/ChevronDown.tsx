import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import IconType from "@/shared/types/IconTypes";

export default function ChevronDown({ color = "black", size = "1x" }: IconType) {
  return <FontAwesomeIcon icon={faChevronDown}  size={size} color={color}></FontAwesomeIcon>;
}
