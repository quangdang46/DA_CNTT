"use client";
import { useCart } from "@/shared/hooks/useCart";
import useClickOutside from "@/shared/hooks/useClickOutside";
import { priceDelivery } from "@/shared/state/cartSlice";
import { ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function Cart() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { cartItems, handleRemoveFromCart, totalPrice } = useCart();
  const deliveryPrice = useSelector(priceDelivery);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLUListElement>(null); // Tham chiếu đến vùng gợi ý
  useClickOutside(containerRef, () => {
    setShowDropdown(false);
  });

  useEffect(() => {
    // Khi URL thay đổi, đóng gợi ý và xóa danh sách gợi ý
    setShowDropdown(false);
  }, [pathname, searchParams]); // Trigger when pathname or searchParams change

  useEffect(() => {
    setShowDropdown(false);
  }, []);
  // Hàm toggle dropdown
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  return (
    <ul id="site-header-cart" className="site-header-cart menu">
      <li className="animate-dropdown dropdown">
        <div
          className="cart-contents"
          style={{ cursor: "pointer" }}
          title="View your shopping cart"
          onClick={toggleDropdown}
        >
          <ShoppingCart strokeWidth={1} />
          <span className="count">{cartItems.length}</span>
          <span className="amount">
            <span className="price-label">Your Cart</span> $
            {(totalPrice - deliveryPrice).toFixed(2)}
          </span>
        </div>
        {/* Dropdown chứa danh sách sản phẩm */}
        <ul
          ref={containerRef}
          className="dropdown-menu dropdown-menu-mini-cart"
          style={{ display: showDropdown ? "block" : "none" }}
        >
          <li>
            <div className="widget woocommerce widget_shopping_cart">
              <div className="widget_shopping_cart_content">
                {cartItems.length > 0 ? (
                  <>
                    <ul className="woocommerce-mini-cart cart_list product_list_widget">
                      {cartItems.map((item) => (
                        <li
                          key={item.id}
                          className="woocommerce-mini-cart-item mini_cart_item"
                        >
                          <button
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                            className="remove"
                            aria-label="Remove this item"
                            onClick={() =>
                              handleRemoveFromCart(item.product_id)
                            }
                          >
                            <X />
                          </button>

                          <Link href={`/details/${item.product.slug}`}>
                            <Image
                              src={
                                item.product.images[0]?.image_url ||
                                "https://placehold.co/100x100"
                              }
                              alt={item.product.name}
                              width={100}
                              height={100}
                            />
                            {item.product.name}
                          </Link>

                          <span className="quantity">
                            {item.quantity} ×{" "}
                            <span className="woocommerce-Price-amount amount">
                              $
                              {typeof item.product.price === "string"
                                ? isNaN(parseFloat(item.product.price))
                                  ? "0.00"
                                  : parseFloat(item.product.price)
                                      .toFixed(2)
                                      .toString()
                                : item.product.price.toFixed(2).toString()}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>

                    <p className="woocommerce-mini-cart__total total">
                      <strong>Subtotal:</strong> $
                      {(totalPrice - deliveryPrice).toFixed(2)}
                    </p>

                    <p className="woocommerce-mini-cart__buttons buttons">
                      <Link href="/cart" className="button wc-forward">
                        View cart
                      </Link>
                      <Link
                        href="/checkout"
                        className="button checkout wc-forward"
                      >
                        Checkout
                      </Link>
                    </p>
                  </>
                ) : (
                  <p className="woocommerce-mini-cart__empty-message">
                    No products in the cart.
                  </p>
                )}
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  );
}
