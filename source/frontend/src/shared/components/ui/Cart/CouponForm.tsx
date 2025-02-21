"use client";
import React from "react";
import Swal from "sweetalert2";
interface Props {
  applyCoupon: (couponCode: string) => void;
  isPending: boolean;
  isCouponApplied: boolean;
  couponCode: string;
  setCouponCode: React.Dispatch<React.SetStateAction<string>>;
}
export default function CouponForm({
  applyCoupon,
  isPending,
  isCouponApplied,
  couponCode,
  setCouponCode,
}: Props) {
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      Swal.fire({
        title: "Error",
        text: "Please enter a valid coupon code",
        icon: "error",
      });
      return;
    }
    applyCoupon(couponCode);
  };
  return (
    <tr>
      <td colSpan={6} className="actions">
        <div className="coupon">
          <label htmlFor="coupon_code" className="screen-reader-text">
            Coupon:
          </label>{" "}
          <input
            type="text"
            name="coupon_code"
            className="input-text"
            id="coupon_code"
            placeholder="Coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            disabled={isCouponApplied}
          />{" "}
          <button
            className="button"
            name="apply_coupon"
            value="Apply coupon"
            onClick={handleApplyCoupon}
            disabled={isPending || isCouponApplied}
          >
            {isPending ? "Applying..." : "Apply coupon"}
          </button>
        </div>
      </td>
    </tr>
  );
}
