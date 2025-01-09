import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import IconType from "@/shared/types/IconTypes";

export default function PaymentIcon({ color = "black", size = "1x" }: IconType) {
  return <FontAwesomeIcon icon={faMoneyBill}  size={size} color={color}></FontAwesomeIcon>;
}
