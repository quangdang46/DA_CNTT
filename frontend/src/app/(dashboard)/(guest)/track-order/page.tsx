import WrapperContent from "@/shared/components/layouts/WrapperContent";
import React from "react";

export default function page() {
  return (
    <WrapperContent>
      <div className="type-page hentry">
        <header className="entry-header">
          <div className="page-header-caption">
            <h1 className="entry-title">Track Order</h1>
          </div>
        </header>
        {/* .entry-header */}
        <div className="entry-content">
          <div className="woocommerce">
            <form className="track_order" method="post" action="#">
              <p>
                To track your order please enter your Order ID in the box below
                and press the Track button. This was given to you on your
                receipt and in the confirmation email you should have received.
              </p>
              <p className="form-row form-row-first">
                <label htmlFor="orderid">Order ID</label>
                <input
                  type="text"
                  placeholder="Found in your order confirmation email."
                  id="orderid"
                  name="orderid"
                  className="input-text"
                />
              </p>
              <p className="form-row form-row-last">
                <label htmlFor="order_email">Billing email</label>
                <input
                  type="text"
                  placeholder="Email you used during checkout."
                  id="order_email"
                  name="order_email"
                  className="input-text"
                />
              </p>
              <div className="clear" />
              <p className="form-row">
                <input
                  type="submit"
                  className="button"
                  name="track"
                  defaultValue="Track"
                />
              </p>
            </form>
            {/* .track_order */}
          </div>
          {/* .woocommerce */}
        </div>
        {/* .entry-content */}
      </div>
    </WrapperContent>
  );
}
