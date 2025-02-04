"use client";
import WrapperContent from "@/shared/components/layouts/WrapperContent";
import MiniCoupon from "@/shared/components/ui/Checkout/MiniCoupon";
import MiniLogin from "@/shared/components/ui/Checkout/MiniLogin";
import OrderForm from "@/shared/components/ui/Checkout/OrderForm";
import React, { useState } from "react";

export default function Page() {
  const [discountAmount, setDiscountAmount] = useState(0);

  return (
    <WrapperContent>
      <div className="type-page hentry">
        <div className="entry-content">
          <div className="woocommerce">
            <MiniLogin></MiniLogin>
            <MiniCoupon
              setDiscountAmount={setDiscountAmount}
            ></MiniCoupon>
            <OrderForm></OrderForm>
          </div>
        </div>
      </div>
    </WrapperContent>
  );
}
