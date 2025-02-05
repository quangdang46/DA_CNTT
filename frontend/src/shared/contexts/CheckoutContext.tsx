"use client";
import React, { createContext, useContext, useState, useMemo } from "react";

// Định nghĩa type cho context
type CheckoutContextType = {
  discountAmount: number;
  setDiscountAmount: (amount: number) => void;
  paymentMethod: string | null;
  setPaymentMethod: (method: string) => void;
  shippingFee: number | null;
  setShippingFee: (fee: number) => void;
  couponCode: string;
  setCouponCode: (code: string) => void;
};

// Tạo context
const CheckoutContext = createContext<CheckoutContextType | null>(null);

// Provider để quản lý trạng thái
export const CheckoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [discountAmount, setDiscountAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [shippingFee, setShippingFee] = useState<number | null>(0);
  const [couponCode, setCouponCode] = useState("");
  const value = useMemo(
    () => ({
      discountAmount,
      setDiscountAmount,
      paymentMethod,
      setPaymentMethod,
      shippingFee,
      setShippingFee,
      couponCode,
      setCouponCode,
    }),
    [discountAmount, paymentMethod, shippingFee, couponCode]
  );

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

// Hook để sử dụng context
export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};
