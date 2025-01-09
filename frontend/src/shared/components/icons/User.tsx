import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import IconType from "@/shared/types/IconTypes";

export default function User({ color = "black", size = "1x" }: IconType) {
  return <FontAwesomeIcon icon={faUser} size={size} color={color}></FontAwesomeIcon>;
}
