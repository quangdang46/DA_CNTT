import Image from "next/image";
import React from "react";

export default function ShopArchiveHeader() {
  return (
    <div className="shop-archive-header">
      <div className="jumbotron">
        <div className="jumbotron-img">
          <Image
            width={416}
            height={283}
            alt=""
            // src="https://plus.unsplash.com/premium_photo-1736780995479-bc82c2bffa2a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            src={
              "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            className="jumbo-image alignright"
          />
        </div>
        <div className="jumbotron-caption">
          <h3 className="jumbo-title">Điện Thoại & Phụ Kiện</h3>

          <p className="jumbo-subtitle">
            Khám phá bộ sưu tập mới nhất với nhiều mẫu mã đa dạng, phù hợp với
            mọi nhu cầu.
            <br />
            <br />
            Xem ngay để không bỏ lỡ!
            <a href="#">Xem chi tiết →</a>
          </p>
        </div>
        {/* .jumbotron-caption */}
      </div>
      {/* .jumbotron */}
    </div>
  );
}
