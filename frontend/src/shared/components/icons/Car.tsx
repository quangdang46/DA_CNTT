import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import IconType from "@/shared/types/IconTypes";

export default function Car({ color = "black", size = "1x" }: IconType) {
  return (
    <FontAwesomeIcon icon={faCar} size={size} color={color}></FontAwesomeIcon>
  );
}
