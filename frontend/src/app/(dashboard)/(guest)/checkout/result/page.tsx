/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const vnp_Amount = searchParams.get("vnp_Amount");
  const vnp_BankCode = searchParams.get("vnp_BankCode");
  const vnp_BankTranNo = searchParams.get("vnp_BankTranNo");
  const vnp_CardType = searchParams.get("vnp_CardType");
  const vnp_OrderInfo = searchParams.get("vnp_OrderInfo");
  const vnp_PayDate = searchParams.get("vnp_PayDate");
  const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
  const vnp_TmnCode = searchParams.get("vnp_TmnCode");
  const vnp_TransactionNo = searchParams.get("vnp_TransactionNo");
  const vnp_TransactionStatus = searchParams.get("vnp_TransactionStatus");
  const vnp_TxnRef = searchParams.get("vnp_TxnRef");
  const vnp_SecureHash = searchParams.get("vnp_SecureHash");

  useEffect(() => {
    if (vnp_ResponseCode === "00" && vnp_TransactionStatus === "00") {
      router.push("/checkout/result/order-success");
    } else {
      alert("Thanh toán không thành công. Vui lòng thử lại!");
      router.push("/checkout/result/order-fail");
    }
  }, [vnp_ResponseCode, vnp_TransactionStatus, router]);

  return (
    <div>
      <h1>Đang xử lý kết quả thanh toán...</h1>
      <p>Số tiền: {vnp_Amount}</p>
      <p>Ngân hàng: {vnp_BankCode}</p>
      <p>Mã giao dịch: {vnp_TransactionNo}</p>
      <p>
        Trạng thái: {vnp_TransactionStatus === "00" ? "Thành công" : "Thất bại"}
      </p>
    </div>
  );
}
