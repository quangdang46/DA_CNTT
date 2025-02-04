"use client";

import locationApiRequest from "@/shared/apiRequests/locationApi";
import AddressModal from "@/shared/components/ui/Account/AddressForm/AddressModal";
import SummaryCheckout from "@/shared/components/ui/Checkout/SummaryCheckout";
import { RootState } from "@/shared/state/store";
import { Address } from "@/shared/types/LocationTypes";
import { orderFormSchema, OrderFormValues } from "@/shared/types/UserTypes";
import { convertAddress } from "@/shared/utils/convertAddress";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function OrderForm() {
  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const { data } = locationApiRequest.useGetAddress();
  const initAddress = data?.data;
  const defaultAddress = initAddress?.find(
    (item: Address) => item.is_default === 1
  );
  useEffect(() => {
    setIsClient(true);
  }, []);
  const { control, handleSubmit } = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      email: user?.email || "",
      address: defaultAddress ? convertAddress(defaultAddress) : "",
      note: "",
    },
  });
  const onSubmit = (data: OrderFormValues) => {
    console.log("Form data submitted:", data);
  };

  if (!isClient) {
    return null; // Không render nội dung này trong SSR
  }
  return (
    <>
      <AddressModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></AddressModal>
      <form
        className="checkout woocommerce-checkout"
        method="post"
        name="checkout"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div id="customer_details" className="col2-set">
          <div className="col-1">
            <div className="woocommerce-billing-fields">
              <h3>Billing Details</h3>
              <div className="woocommerce-billing-fields__field-wrapper-outer">
                <div className="woocommerce-billing-fields__field-wrapper">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState }) => (
                      <div
                        id="billing_first_name_field"
                        className="form-row form-row-wide validate-required"
                      >
                        <label htmlFor="name">
                          First Name
                          <abbr title="required" className="required">
                            *
                          </abbr>
                        </label>
                        <input
                          {...field}
                          type="text"
                          disabled={!isLoggedIn}
                          placeholder=""
                          id="name"
                          className="input-text"
                        />
                        {fieldState.error && (
                          <p className="error-message">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <Controller
                    name="phone"
                    control={control}
                    render={({ field, fieldState }) => (
                      <div
                        id="billing_phone_field"
                        className="form-row form-row-last validate-required"
                      >
                        <label htmlFor="phone">
                          Phone
                          <abbr title="required" className="required">
                            *
                          </abbr>
                        </label>
                        <input
                          {...field}
                          type="text"
                          disabled={!isLoggedIn}
                          placeholder=""
                          id="phone"
                          className="input-text"
                        />
                        {fieldState.error && (
                          <p className="error-message">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                      <div
                        id="billing_email_field"
                        className="form-row form-row-first validate-required"
                      >
                        <label htmlFor="email">
                          Email Address
                          <abbr title="required" className="required">
                            *
                          </abbr>
                        </label>
                        <input
                          {...field}
                          type="email"
                          disabled={!isLoggedIn}
                          placeholder=""
                          id="email"
                          className="input-text"
                        />
                        {fieldState.error && (
                          <p className="error-message">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <Controller
                    name="address"
                    control={control}
                    render={({ field, fieldState }) => (
                      <div
                        id="billing_address_1_field"
                        className="form-row form-row-wide address-field validate-required"
                      >
                        <label htmlFor="address">
                          Street address
                          <abbr title="required" className="required">
                            *
                          </abbr>
                        </label>
                        <input
                          {...field}
                          type="text"
                          disabled
                          placeholder="Street address"
                          id="address"
                          className="input-text"
                          value={
                            defaultAddress ? convertAddress(defaultAddress) : ""
                          }
                        />
                        {fieldState.error && (
                          <p className="error-message">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                  <div className="form-row form-row-wide">
                    <label className="woocommerce-form__label">
                      <span
                        style={{ cursor: "pointer", color: "blue" }}
                        onClick={openModal}
                      >
                        Select delivery address?
                      </span>
                    </label>
                  </div>
                  <Controller
                    name="note"
                    control={control}
                    render={({ field }) => (
                      <div id="order_comments_field" className="form-row notes">
                        <label htmlFor="note">Order notes</label>
                        <textarea
                          {...field}
                          cols={5}
                          rows={5}
                          placeholder="Notes about your order, e.g. special notes for delivery."
                          id="note"
                          className="input-text"
                        />
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <SummaryCheckout></SummaryCheckout>
      </form>
    </>
  );
}
