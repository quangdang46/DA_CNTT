"use client";
import React, { createContext, useContext, useState, useMemo } from "react";

// Định nghĩa type cho context
type CheckoutContextType = {
  discountAmount: number;
  setDiscountAmount: (amount: number) => void;
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

  // Dùng useMemo để tránh re-render không cần thiết
  const value = useMemo(
    () => ({ discountAmount, setDiscountAmount }),
    [discountAmount]
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
