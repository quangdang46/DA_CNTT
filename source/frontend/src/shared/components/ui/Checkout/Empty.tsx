import Link from "next/link";
import React from "react";

export default function Empty() {
  return (
    <>
      <div className="wc-empty-cart-message">
        <div className="cart-empty woocommerce-info">
          Your cart is currently empty.{" "}
        </div>
      </div>
      <p className="return-to-shop">
        <Link className="button wc-backward" href="/">
          Return to shop{" "}
        </Link>
      </p>
    </>
  );
}
