// import React from 'react'

// export default function Payment() {
//   return (
//     <div className="woocommerce-checkout-payment" id="payment">
//       <ul className="wc_payment_methods payment_methods methods">
//         <li className="wc_payment_method payment_method_bacs">
//           <input
//             type="radio"
//             data-order_button_text=""
//             name="payment_method"
//             className="input-radio"
//             id="payment_method_bacs"
//           />
//           <label htmlFor="payment_method_bacs">Direct bank transfer</label>
//           <div className="payment_box payment_method_bacs" style={{}}>
//             <p>
//               Make your payment directly into our bank account. Please use your
//               Order ID as the payment reference. Your order won’t be shipped
//               until the funds have cleared in our account.
//             </p>
//           </div>
//         </li>
//         <li className="wc_payment_method payment_method_cod">
//           <input
//             type="radio"
//             data-order_button_text=""
//             name="payment_method"
//             className="input-radio"
//             id="payment_method_cod"
//           />
//           <label htmlFor="payment_method_cod">Cash on delivery</label>
//           <div className="payment_box payment_method_cod" style={{}}>
//             <p>Pay with cash upon delivery.</p>
//           </div>
//         </li>
//       </ul>
//       <div className="form-row place-order">
//         <p className="form-row terms wc-terms-and-conditions woocommerce-validated">
//           <label className="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox">
//             <input
//               type="checkbox"
//               id="terms"
//               name="terms"
//               className="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox"
//             />
//             <span>
//               I’ve read and accept the
//               <a
//                 className="woocommerce-terms-and-conditions-link"
//                 href="terms-and-conditions.html"
//               >
//                 terms &amp; conditions
//               </a>
//             </span>
//             <span className="required">*</span>
//           </label>
//         </p>
//         <button type="submit" className="button wc-forward text-center">
//           Place order
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useState } from "react";

export default function Payment() {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="woocommerce-checkout-payment" id="payment">
      <ul className="wc_payment_methods payment_methods methods">
        {/* Direct Bank Transfer */}
        <li className="wc_payment_method payment_method_bacs">
          <div className="payment_row">
            <input
              type="radio"
              name="payment_method"
              id="payment_method_bacs"
              checked={selectedPayment === "bacs"}
              onChange={() => setSelectedPayment("bacs")}
            />
            <label htmlFor="payment_method_bacs">Direct bank transfer</label>
          </div>

          {selectedPayment === "bacs" && (
            <div className="payment_box payment_method_bacs">
              <p>
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order won’t be
                shipped until the funds have cleared in our account.
              </p>
            </div>
          )}
        </li>

        {/* Cash On Delivery */}
        <li className="wc_payment_method payment_method_cod">
          <div className="payment_row">
            <input
              type="radio"
              name="payment_method"
              id="payment_method_cod"
              checked={selectedPayment === "cod"}
              onChange={() => setSelectedPayment("cod")}
            />
            <label htmlFor="payment_method_cod">Cash on delivery</label>
          </div>
          {selectedPayment === "cod" && (
            <div className="payment_box payment_method_cod">
              <p>Pay with cash upon delivery.</p>
            </div>
          )}
        </li>
      </ul>

      {/* Checkbox Terms & Conditions */}
      <div className="form-row place-order">
        <p className="form-row terms wc-terms-and-conditions woocommerce-validated">
          <label className="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <span>
              I’ve read and accept the{" "}
              <a
                className="woocommerce-terms-and-conditions-link"
                href="terms-and-conditions.html"
              >
                terms &amp; conditions
              </a>
            </span>
            <span className="required">*</span>
          </label>
        </p>

        {/* Place Order Button */}
        <button
          type="submit"
          className="button wc-forward text-center"
          disabled={!isChecked}
        >
          Place order
        </button>
      </div>
    </div>
  );
}
