import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeCompare } from "@fortawesome/free-solid-svg-icons";
import IconType from "@/shared/types/IconTypes";

export default function CompareIcon({ color = "black", size = "1x" }: IconType) {
  return <FontAwesomeIcon icon={faCodeCompare}  size={size} color={color}></FontAwesomeIcon>;
}

