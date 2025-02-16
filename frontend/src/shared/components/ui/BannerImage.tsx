import { MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function BannerImage() {
  return (
    <div className="banner full-width-banner">
      <Link href="/shop">
        <div
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundImage:
              "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            height: "236px",
          }}
          className="banner-bg"
        >
          <div className="caption">
            <div className="banner-info">
              <h3 className="title">
                <strong>Công nghệ đột phá</strong>, trải nghiệm
                <br /> hiệu suất mạnh mẽ hàng đầu
              </h3>
              <h4 className="subtitle">
                Pin bền bỉ, sạc nhanh – Giải trí suốt ngày dài
              </h4>
            </div>
            <span className="banner-action button">
              Khám phá ngay
              <MoveRight />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
