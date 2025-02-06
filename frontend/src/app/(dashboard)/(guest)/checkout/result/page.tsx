"use client";

import orderApiRequest from "@/shared/apiRequests/order";
import WrapperContent from "@/shared/components/layouts/WrapperContent";
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
      router.push("/");
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
      vnp_ResponseCode,
      vnp_TransactionStatus,
      vnp_TransactionNo,
    };
    mutate(payload, {
      onSuccess: (data) => {
        if (vnp_ResponseCode === "00" && vnp_TransactionStatus === "00") {
          router.push(
            `/checkout/result/order-success?tracking_code=${
              data.tracking_code
            }&tracking_url=${encodeURIComponent(data.tracking_url)}`
          );
          return;
        }
        router.push("/checkout/result/order-fail");
      },
      onError: () => {
        router.push("/checkout/result/order-fail");
      },
    });
  }, [vnp_ResponseCode, vnp_TransactionStatus, vnp_TxnRef, mutate, router]);

  return (
    <WrapperContent>
      <h1>Đang xử lý kết quả thanh toán...</h1>
      <p>
        <strong>Số tiền: </strong>
        {vnp_Amount ? `${Number(vnp_Amount) / 100} VND` : "Không xác định"}
      </p>
      <p>
        <strong>Ngân hàng: </strong>
        {vnp_BankCode || "Không rõ"}
      </p>
      <p>
        <strong>Mã giao dịch: </strong>

        {vnp_TransactionNo || "Không có"}
      </p>
      <p>
        <strong>Trạng thái: </strong>
        {vnp_TransactionStatus === "00" ? "Thành công" : "Thất bại"}
      </p>
    </WrapperContent>
  );
}
