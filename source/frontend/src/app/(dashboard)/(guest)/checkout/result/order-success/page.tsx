"use client";
import WrapperContent from "@/shared/components/layouts/WrapperContent";
import { useCart } from "@/shared/hooks/useCart";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const trackingCode = searchParams.get("tracking_code");
  const trackingUrl = searchParams.get("tracking_url");

  const [isLoading, setIsLoading] = useState(true);
  const { handleClearCart } = useCart();

  useEffect(() => {
    // Kiểm tra nếu thiếu tham số
    if (!trackingCode || !trackingUrl) {
      setIsLoading(false);
      router.push("/");
    } else {
      handleClearCart();
      setIsLoading(false);
    }
  }, [router, trackingCode, trackingUrl]);

  if (isLoading) {
    return <p>Đang tải thông tin...</p>;
  }

  return (
    <WrapperContent>
      <h1>Đơn hàng thành công!</h1>
      <p>Mã theo dõi: {trackingCode}</p>
      <p>
        <Link
          href={trackingUrl || ""}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "blue", fontWeight: "bold" }}
        >
          Bấm vào đây để xem chi tiết
        </Link>
      </p>
    </WrapperContent>
  );
}
