"use client";
import WrapperContent from "@/shared/components/layouts/WrapperContent";
import Empty from "@/shared/components/ui/Checkout/Empty";
import MiniCoupon from "@/shared/components/ui/Checkout/MiniCoupon";
import MiniLogin from "@/shared/components/ui/Checkout/MiniLogin";
import OrderForm from "@/shared/components/ui/Checkout/OrderForm";
import { CheckoutProvider } from "@/shared/contexts/CheckoutContext";
import { useCart } from "@/shared/hooks/useCart";
import React from "react";

export default function Page() {
  const { cartItems } = useCart();

  return (
    <WrapperContent>
      <div className="type-page hentry">
        <div className="entry-content">
          <div className="woocommerce">
            {cartItems.length === 0 ? (
              <>
                <Empty></Empty>
              </>
            ) : (
              <CheckoutProvider>
                <MiniLogin></MiniLogin>
                <MiniCoupon></MiniCoupon>
                <OrderForm></OrderForm>
              </CheckoutProvider>
            )}
          </div>
        </div>
      </div>
    </WrapperContent>
  );
}
