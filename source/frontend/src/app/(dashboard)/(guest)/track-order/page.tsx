/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import orderApiRequest from "@/shared/apiRequests/order";
import WrapperContent from "@/shared/components/layouts/WrapperContent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";
const formSchema = z.object({
  orderid: z.string().min(1, "Order ID is required"),
});

export default function Page() {
  const searchParams = useSearchParams();
  const [initialOrderId, setInitialOrderId] = useState("");
  const [trackingData, setTrackingData] = useState<any>(null);
  const { mutate } = orderApiRequest.useTrackOrder();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderid: initialOrderId || "",
    },
  });

  useEffect(() => {
    const orderIdFromSearch = searchParams.get("orderid");
    if (orderIdFromSearch) {
      setInitialOrderId(orderIdFromSearch);
      setValue("orderid", orderIdFromSearch); // Cập nhật giá trị vào form
    } else {
      setValue("orderid", ""); // Đặt giá trị về rỗng nếu không có order ID
    }
  }, [searchParams, setValue]);

  const onSubmit = (data: any) => {
    mutate(
      { tracking_code: data.orderid },
      {
        onSuccess: (data) => {
          if (data.success) {
            setTrackingData(data.order);
          }
        },
        onError: () => {
          Swal.fire({
            icon: "error",
            title: "Lỗi khi Track Order",
            text: "Vui lòng thử lại sau.",
          });
        },
      }
    );
  };
  const renderValue = (value: any) => {
    return value ? value : "Chưa có";
  };
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
            <form
              className="track_order"
              method="post"
              style={{ justifyContent: "center" }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <p>
                To track your order please enter your Order ID in the box below
                and press the Track button. This was given to you on your
                receipt and in the confirmation email you should have received.
              </p>
              <p className="form-row form-row-first">
                <label htmlFor="orderid">Order ID</label>
                <input
                  type="text"
                  placeholder="Track order by name or order number"
                  {...register("orderid")}
                  className="input-text"
                />
                {errors.orderid && (
                  <p style={{ color: "red" }}>{errors?.orderid?.message}</p>
                )}
              </p>

              <div className="clear" />
              <p className="form-row">
                <input
                  type="submit"
                  className="button"
                  name="track"
                  value="Track"
                />
              </p>
            </form>
            {trackingData && (
              <div className="tracking-result">
                <h3>Order Tracking Details</h3>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <div style={{ width: "50%" }}>
                    <strong>Label ID:</strong>{" "}
                    {renderValue(trackingData.label_id)}
                  </div>
                  <div style={{ width: "50%" }}>
                    <strong>Partner ID:</strong>{" "}
                    {renderValue(trackingData.partner_id)}
                  </div>
                  <div style={{ width: "50%" }}>
                    <strong>Status:</strong> {renderValue(trackingData.status)}
                  </div>
                  <div style={{ width: "50%" }}>
                    <strong>Status Text:</strong>{" "}
                    {renderValue(trackingData.status_text)}
                  </div>
                  <div style={{ width: "50%" }}>
                    <strong>Created:</strong>{" "}
                    {renderValue(trackingData.created)}
                  </div>
                  <div style={{ width: "50%" }}>
                    <strong>Modified:</strong>{" "}
                    {renderValue(trackingData.modified)}
                  </div>
                  <div style={{ width: "50%" }}>
                    <strong>Message:</strong>{" "}
                    {renderValue(trackingData.message)}
                  </div>
                  <div style={{ width: "50%" }}>
                    <strong>Pick Date:</strong>{" "}
                    {renderValue(trackingData.pick_date)}
                  </div>
                  <div style={{ width: "50%" }}>
                    <strong>Deliver Date:</strong>{" "}
                    {renderValue(trackingData.deliver_date)}
                  </div>
                  <div style={{ width: "50%" }}>
                    <strong>Customer Fullname:</strong>{" "}
                    {renderValue(trackingData.customer_fullname)}
                  </div>
                  <div style={{ width: "50%" }}>
                    <strong>Customer Tel:</strong>{" "}
                    {renderValue(trackingData.customer_tel)}
                  </div>
                  <div style={{ width: "50%" }}>
                    <strong>Address:</strong>{" "}
                    {renderValue(trackingData.address)}
                  </div>
                  <div style={{ width: "50%" }}>
                    <strong>Storage Day:</strong>{" "}
                    {renderValue(trackingData.storage_day)}
                  </div>
                  <div style={{ width: "50%" }}>
                    <strong>Ship Money:</strong>{" "}
                    {renderValue(trackingData.ship_money)}
                  </div>
                  <div style={{ width: "50%" }}>
                    <strong>Insurance:</strong>{" "}
                    {renderValue(trackingData.insurance)}
                  </div>
                  <div style={{ width: "50%" }}>
                    <strong>Value:</strong> {renderValue(trackingData.value)}
                  </div>
                  <div style={{ width: "50%" }}>
                    <strong>Weight:</strong> {renderValue(trackingData.weight)}
                  </div>
                  <div style={{ width: "50%" }}>
                    <strong>Pick Money:</strong>{" "}
                    {renderValue(trackingData.pick_money)}
                  </div>
                  <div style={{ width: "50%" }}>
                    <strong>Is Free Ship:</strong>{" "}
                    {renderValue(
                      trackingData.is_freeship === "1" ? "Yes" : "No"
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* .woocommerce */}
        </div>
        {/* .entry-content */}
      </div>
    </WrapperContent>
  );
}
