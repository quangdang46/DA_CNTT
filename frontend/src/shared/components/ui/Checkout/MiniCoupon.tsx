"use client";
import apiClient from "@/shared/config/apiClient";
import { useCheckout } from "@/shared/contexts/CheckoutContext";
import { useCart } from "@/shared/hooks/useCart";
import { DiscountResType, DiscountType } from "@/shared/types/DiscountTypes";
import { useMutation } from "@tanstack/react-query";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const useApplyCoupon = () => {
  return useMutation<DiscountResType, Error, DiscountType>({
    mutationFn: (body: DiscountType) =>
      apiClient.post<DiscountType, DiscountResType>("/apply-discount", body),
  });
};
export default function MiniCoupon() {
  const { setDiscountAmount } = useCheckout();
  const { totalPrice } = useCart();
  const [show, setShow] = useState(false);
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
  return (
    <>
      <div className="woocommerce-info">
        Have a coupon?
        <span
          style={{ cursor: "pointer" }}
          className="showlogin"
          onClick={() => setShow(!show)}
        >
          Click here to enter your code
        </span>
      </div>
      <div
        className={show ? "collapse show" : "collapse"}
        id="checkoutCouponForm"
      >
        <div className="checkout_coupon">
          <p className="form-row form-row-first">
            <input
              type="text"
              id="coupon_code"
              placeholder="Coupon code"
              className="input-text"
              name="coupon_code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              disabled={isCouponApplied}
            />
          </p>
          <p className="form-row form-row-last">
            <button
              type="button"
              name="apply_coupon"
              className="button"
              onClick={handleApplyCoupon}
              disabled={isPending || isCouponApplied}
            >
              {isPending ? "Applying..." : "Apply coupon"}
            </button>
          </p>
          <div className="clear" />
        </div>
      </div>
    </>
  );
}
