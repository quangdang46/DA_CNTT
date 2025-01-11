import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import IconType from "@/shared/types/IconTypes";

export default function Check({ color = "green", size = "1x" }: IconType) {
  return (
    <FontAwesomeIcon icon={faCheck} size={size} color={color}></FontAwesomeIcon>
  );
}
