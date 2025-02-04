/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CartSummary from "@/shared/components/ui/Cart/CartSummary";
import CartTableItem from "@/shared/components/ui/Cart/CartTableItem";
import CouponForm from "@/shared/components/ui/Cart/CouponForm";
import { useCart } from "@/shared/hooks/useCart";
import { DiscountResType, DiscountType } from "@/shared/types/DiscountTypes";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import apiClient from "@/shared/config/apiClient";
import { debounce } from "lodash";

const useApplyCoupon = () => {
  return useMutation<DiscountResType, Error, DiscountType>({
    mutationFn: (body: DiscountType) =>
      apiClient.post<DiscountType, DiscountResType>("/apply-discount", body),
  });
};

export default function CartContainer() {
  const { cartItems, handleRemoveFromCart, handleUpdateQuantity, totalPrice } =
    useCart();
    console.log("cartItems", cartItems);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponCode, setCouponCode] = useState<string>("");

  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const { mutate, isPending } = useApplyCoupon();

  const handleApplyCoupon = (): void => {
    if (!couponCode.trim()) {
      Swal.fire({
        title: "Error",
        text: "Please enter a valid coupon code",
        icon: "error",
      });
      return;
    }

    mutate(
      {
        discount_code: couponCode,
        target_type: "order",
        target_id: "temp_order_123", // ID tạm thời của đơn hàng
        total_amount: totalPrice, // Tổng giá trị đơn hàng
      },
      {
        onSuccess: (data) => {
          if (!data.success) {
            Swal.fire({
              title: "Error",
              text: data.message,
              icon: "error",
            });
            return;
          }
          setDiscountAmount(data.discount_amount); // Cập nhật số tiền giảm
          setIsCouponApplied(true); // Tắt input và nút "Apply coupon"
          Swal.fire({
            title: "Success",
            text: "Coupon applied successfully!",
            icon: "success",
          });
        },
        onError: (error: Error) => {
          Swal.fire({
            title: "Error",
            text: error.message || "An unexpected error occurred",
            icon: "error",
          });
        },
      }
    );
  };
  const handleQuantity = (e: any, productId: string, action: string) => {
    const currentItem = cartItems.find((item) => item.product_id === productId);
    if (!currentItem) return;

    let newQuantity = currentItem.quantity;

    if (action === "increase") {
      newQuantity += 1;
    } else if (action === "decrease") {
      newQuantity = Math.max(0, newQuantity - 1);
      if (newQuantity === 0) {
        Swal.fire({
          title: "Are you sure?",
          text: "You want to remove the item from cart",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, remove it!",
        }).then((result) => {
          if (result.isConfirmed) {
            handleRemoveFromCart(productId);
          }
        });
        return;
      }
    } else if (action === "input") {
      newQuantity = parseInt(e.target.value) || 0;
    }
    handleUpdateQuantity({
      product_id: productId,
      quantity: newQuantity,
    });
  };

  const debouncedApplyCoupon = debounce((body: DiscountType) => {
    mutate(body, {
      onSuccess: (data) => {
        if (!data.success) {
          return; // Không hiển thị thông báo nếu thất bại
        }
        setDiscountAmount(data.discount_amount); // Cập nhật số tiền giảm
      },
    });
  }, 500);

  useEffect(() => {
    if (isCouponApplied && couponCode.trim()) {
      debouncedApplyCoupon({
        discount_code: couponCode,
        target_type: "order",
        target_id: "temp_order_123", // ID tạm thời của đơn hàng
        total_amount: totalPrice, // Tổng giá trị đơn hàng
      });
    }
  }, [totalPrice, isCouponApplied, couponCode]);

  if (cartItems.length === 0) return <></>;

  return (
    <div className="cart-wrapper">
      <div className="woocommerce-cart-form">
        <table
          className="shop_table shop_table_responsive cart woocommerce-cart-form__contents"
          cellSpacing={0}
        >
          <thead>
            <tr>
              <th className="product-name">Product</th>
              <th className="product-price">Price</th>
              <th className="product-quantity">Quantity</th>
              <th className="product-subtotal">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <CartTableItem
                key={item.id}
                item={item}
                handleQuantity={handleQuantity}
                handleRemoveFromCart={handleRemoveFromCart}
              ></CartTableItem>
            ))}

            <CouponForm
              applyCoupon={handleApplyCoupon}
              isPending={isPending}
              isCouponApplied={isCouponApplied}
              couponCode={couponCode}
              setCouponCode={setCouponCode}
            ></CouponForm>
          </tbody>
        </table>
      </div>
      <CartSummary
        discountAmount={discountAmount}
      ></CartSummary>
    </div>
  );
}
