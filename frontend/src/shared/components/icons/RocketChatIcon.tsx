import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import IconType from "@/shared/types/IconTypes";

export default function RocketChatIcon({ color = "black", size = "1x" }: IconType) {
  return <FontAwesomeIcon icon={faComment} size={size} color={color}></FontAwesomeIcon>;
}

