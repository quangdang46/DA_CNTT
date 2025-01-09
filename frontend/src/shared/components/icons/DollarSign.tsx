import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import IconType from "@/shared/types/IconTypes";

export default function DollarSign({ color = "black", size = "1x" }: IconType) {
  return <FontAwesomeIcon icon={faDollarSign} size={size} color={color}></FontAwesomeIcon>;
}
