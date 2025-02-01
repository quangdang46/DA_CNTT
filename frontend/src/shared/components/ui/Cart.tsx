"use client";
import { useCart } from "@/shared/hooks/useCart";
import useClickOutside from "@/shared/hooks/useClickOutside";
import { ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function Cart() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { cartItems, totalPrice, handleRemoveFromCart } = useCart();
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
            {totalPrice.toFixed(2)}
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
                {/* Hiển thị danh sách sản phẩm */}
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
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            <X />
                          </button>

                          <Link href={`/details/${item.slug}`}>
                            <Image
                              src={
                                item.images[0]?.image_url ||
                                "https://placehold.co/100x100"
                              } // Lấy URL hình ảnh đầu tiên
                              alt={item.name}
                              width={100}
                              height={100}
                            />
                            {item.name}
                          </Link>

                          {/* Số lượng và giá tiền */}
                          <span className="quantity">
                            {item.quantity} ×{" "}
                            <span className="woocommerce-Price-amount amount">
                              $
                              {typeof item.price === "string"
                                ? isNaN(parseFloat(item.price))
                                  ? "0.00"
                                  : parseFloat(item.price).toFixed(2).toString()
                                : item.price.toFixed(2).toString()}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Tổng tiền */}
                    <p className="woocommerce-mini-cart__total total">
                      <strong>Subtotal:</strong> ${totalPrice.toFixed(2)}
                    </p>

                    {/* Nút View Cart và Checkout */}
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
                  // Hiển thị khi giỏ hàng trống
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
