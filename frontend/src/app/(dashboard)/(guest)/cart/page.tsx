import WrapperContent from "@/shared/components/layouts/WrapperContent";
import React from "react";
import CartNotice from "@/shared/components/ui/Cart/CartNotice";
import CartContainer from "@/shared/components/ui/Cart/CartContainer";

export default function Page() {
  return (
    <WrapperContent>
      {/* empty */}
      <div id="post-5" className="post-5 page type-page status-publish hentry">
        <div className="entry-content">
          {/* <div className="woocommerce">
            <div className="woocommerce-notices-wrapper">
              <div className="woocommerce-message" role="alert" tabIndex={-1}>
                “Smart Watches 3 SWR50” removed.{" "}
                <a
                  href="https://techmarket.madrasthemes.com/cart/?undo_item=45c48cce2e2d7fbdea1afc51c7c6ad26&_wpnonce=528b4262a8"
                  className="restore-item"
                >
                  Undo?
                </a>{" "}
              </div>
            </div>
             */}

          <div className="woocommerce">
            <div className="woocommerce-notices-wrapper">
              <CartNotice></CartNotice>
            </div>
            <CartContainer></CartContainer>
          </div>
        </div>
      </div>
    </WrapperContent>
  );
}
