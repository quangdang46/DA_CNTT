import WrapperContent from "@/shared/components/layouts/WrapperContent";
import MiniCoupon from "@/shared/components/ui/Checkout/MiniCoupon";
import MiniLogin from "@/shared/components/ui/Checkout/MiniLogin";
import OrderForm from "@/shared/components/ui/Checkout/OrderForm";
import { CheckoutProvider } from "@/shared/contexts/CheckoutContext";
import React from "react";

export default function Page() {
  return (
    <WrapperContent>
      <div className="type-page hentry">
        <div className="entry-content">
          <div className="woocommerce">
            <CheckoutProvider>
              <MiniLogin></MiniLogin>
              <MiniCoupon></MiniCoupon>
              <OrderForm></OrderForm>
            </CheckoutProvider>
          </div>
        </div>
      </div>
    </WrapperContent>
  );
}
