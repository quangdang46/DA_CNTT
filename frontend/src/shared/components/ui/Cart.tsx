"use client";
import CartIcon from "@/shared/components/icons/CartIcon";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Cart() {
  const [showDropdown, setShowDropdown] = useState(false);

  // Hàm toggle dropdown
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  return (
    <ul id="site-header-cart" className="site-header-cart menu">
      <li className="animate-dropdown dropdown">
        <div
          className="cart-contents"
          title="View your shopping cart"
          onClick={toggleDropdown}
        >
          <CartIcon size="2x"></CartIcon>
          <span className="count">2</span>
          <span className="amount">
            <span className="price-label">Your Cart</span> $136.99
          </span>
        </div>
        <ul
          className="dropdown-menu dropdown-menu-mini-cart"
          style={{ display: showDropdown ? "block" : "none" }}
        >
          <li>
            <div className="widget woocommerce widget_shopping_cart">
              <div className="widget_shopping_cart_content">
                <ul className="woocommerce-mini-cart cart_list product_list_widget">
                  <li className="woocommerce-mini-cart-item mini_cart_item">
                    <a
                      href="#"
                      className="remove"
                      aria-label="Remove this item"
                      data-product_id="65"
                      data-product_sku=""
                    >
                      ×
                    </a>
                    <Link href="/product/xone-wireless-controller">
                      <Image
                        src="https://images.unsplash.com/photo-1720048171209-71f6fc3d7ea4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        width={100}
                        height={100}
                      />
                      XONE Wireless Controller
                    </Link>
                    <span className="quantity">
                      1 ×{" "}
                      <span className="woocommerce-Price-amount amount">
                        $64.99
                      </span>
                    </span>
                  </li>
                  <li className="woocommerce-mini-cart-item mini_cart_item">
                    <a
                      href="#"
                      className="remove"
                      aria-label="Remove this item"
                      data-product_id="27"
                      data-product_sku=""
                    >
                      ×
                    </a>
                    <Link href="/product/gear-virtual-reality">
                      <Image
                        src="https://images.unsplash.com/photo-1720048171209-71f6fc3d7ea4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        width={100}
                        height={100}
                      />
                      Gear Virtual Reality 3D with Bluetooth Glasses
                    </Link>
                    <span className="quantity">
                      1 ×{" "}
                      <span className="woocommerce-Price-amount amount">
                        $72.00
                      </span>
                    </span>
                  </li>
                </ul>
                <p className="woocommerce-mini-cart__total total">
                  <strong>Subtotal:</strong> $136.99
                </p>
                <p className="woocommerce-mini-cart__buttons buttons">
                  <Link href="/cart" className="button wc-forward">
                    View cart
                  </Link>
                  <Link href="/checkout" className="button checkout wc-forward">
                    Checkout
                  </Link>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  );
}
