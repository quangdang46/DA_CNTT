/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import orderApiRequest from "@/shared/apiRequests/order";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { mutate } = orderApiRequest.useReturnPayment();
  const vnp_TmnCode = searchParams.get("vnp_TmnCode");
  const vnp_Amount = searchParams.get("vnp_Amount");
  const vnp_CreateDate = searchParams.get("vnp_PayDate");
  const vnp_OrderInfo = searchParams.get("vnp_OrderInfo");
  const vnp_TxnRef = searchParams.get("vnp_TxnRef");
  const vnp_BankCode = searchParams.get("vnp_BankCode");
  const vnp_SecureHash = searchParams.get("vnp_SecureHash");

  const vnp_TransactionStatus = searchParams.get("vnp_TransactionStatus");
  const vnp_TransactionNo = searchParams.get("vnp_TransactionNo");
  const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");

  useEffect(() => {
    if (!vnp_TxnRef || !vnp_TransactionStatus || !vnp_SecureHash) {
      console.error("Thiếu thông tin cần thiết để xác thực thanh toán!");
      alert("Lỗi: Dữ liệu thanh toán không hợp lệ.");
      router.push("/checkout/result/order-fail");
      return;
    }
    const payload = {
      vnp_TmnCode,
      vnp_Amount,
      vnp_CreateDate,
      vnp_OrderInfo,
      vnp_TxnRef,
      vnp_BankCode,
      vnp_SecureHash,
    };
    mutate(payload, {
      onSuccess: () => {
        if (vnp_ResponseCode === "00" && vnp_TransactionStatus === "00") {
          router.push("/checkout/result/order-success");
          return;
        }
        alert("Thanh toán không thành công. Vui lòng thử lại!");
        router.push("/checkout/result/order-fail");
      },
      onError: (error) => {
        console.error("Lỗi khi cập nhật trạng thái thanh toán:", error);
        alert("Có lỗi khi cập nhật trạng thái thanh toán!");
        router.push("/checkout/result/order-fail");
      },
    });
  }, [vnp_ResponseCode, vnp_TransactionStatus, vnp_TxnRef, mutate, router]);

  return (
    <div>
      <h1>Đang xử lý kết quả thanh toán...</h1>
      <p>
        Số tiền:{" "}
        {vnp_Amount ? `${Number(vnp_Amount) / 100} VND` : "Không xác định"}
      </p>
      <p>Ngân hàng: {vnp_BankCode || "Không rõ"}</p>
      <p>Mã giao dịch: {vnp_TransactionNo || "Không có"}</p>
      <p>
        Trạng thái: {vnp_TransactionStatus === "00" ? "Thành công" : "Thất bại"}
      </p>
    </div>
  );
}
