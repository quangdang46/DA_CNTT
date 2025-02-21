
"use client";
import { useCart } from "@/shared/hooks/useCart";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import React from "react";
interface Props {
  type?: string;
}
export default function CartNotice({ type = "empty" }: Props) {
  const { cartItems } = useCart();
  return (
    <div className="woocommerce-notices-wrapper">
      {cartItems.length === 0 && (
        <>
          <div className="wc-empty-cart-message">
            <div className="cart-empty woocommerce-info">
              Your cart is currently empty.
            </div>
          </div>
          <p className="return-to-shop">
            <Link className="button wc-backward" href="/shop">
              <Undo2 /> Return to shop
            </Link>
          </p>
        </>
      )}
      {type === "updated" && (
        <div className="woocommerce-message" role="alert">
          Cart updated.{" "}
        </div>
      )}
    </div>
  );
}
