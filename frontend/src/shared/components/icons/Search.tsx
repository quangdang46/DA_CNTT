import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import IconType from "@/shared/types/IconTypes";

export default function Search({ color = "black", size = "1x" }: IconType) {
  return <FontAwesomeIcon icon={faSearch}  size={size} color={color}></FontAwesomeIcon>;
}
