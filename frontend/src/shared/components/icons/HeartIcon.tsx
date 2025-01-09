import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import IconType from "@/shared/types/IconTypes";

export default function HeartIcon({ color = "black", size = "1x" }: IconType) {
  return <FontAwesomeIcon icon={faHeart}  size={size} color={color}></FontAwesomeIcon>;
}

