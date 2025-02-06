/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import WrapperContent from "@/shared/components/layouts/WrapperContent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
  orderid: z.string().min(1, "Order ID is required"),
});

export default function Page() {
  const searchParams = useSearchParams();
  const [initialOrderId, setInitialOrderId] = useState("");

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
    // Xử lý khi form được submit
    console.log("Submitted Order ID: ", data.orderid);
    // Gửi yêu cầu hoặc xử lý thêm ở đây
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
            {/* .track_order */}
          </div>
          {/* .woocommerce */}
        </div>
        {/* .entry-content */}
      </div>
    </WrapperContent>
  );
}
