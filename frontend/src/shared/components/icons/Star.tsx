import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import IconType from "@/shared/types/IconTypes";

export default function Star({ color = "yellow", size = "1x" }: IconType) {
  return (
    <FontAwesomeIcon icon={faStar} size={size} color={color}></FontAwesomeIcon>
  );
}
