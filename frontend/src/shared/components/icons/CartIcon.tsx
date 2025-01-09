import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import IconType from "@/shared/types/IconTypes";

export default function CartIcon({ color = "black", size = "1x" }: IconType) {
  return <FontAwesomeIcon icon={faCartShopping} size={size} color={color}></FontAwesomeIcon>;
}
