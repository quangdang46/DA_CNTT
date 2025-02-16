import React from "react";

export default function PromotionalBanners() {
  return (
    <div className="banners">
      <div className="row">
        <div className="banner banner-long text-in-right">
          <a href="/shop">
            {/* <div
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1736496690005-3045da00c199?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                height: "259px",
              }}
              className="banner-bg"
            >
              <div className="caption">
                <div className="banner-info">
                  <h3 className="title">
                    <strong>Shop now</strong> to find savings on everything you
                    need
                    <br /> for the big game.
                  </h3>
                </div>
                <span className="banner-action button">Browse</span>
              </div>
            </div> */}
            <div
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundImage:
                  "url('https://plus.unsplash.com/premium_photo-1683758344017-61aec4a1d2d3?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                height: "259px",
              }}
              className="banner-bg"
            >
              <div className="caption">
                <div className="banner-info">
                  <h3 className="title">
                    <strong>Mua ngay</strong> điện thoại chính hãng với giá cực
                    tốt
                    <br /> cùng nhiều ưu đãi hấp dẫn.
                  </h3>
                </div>
                <span className="banner-action button">Khám phá ngay</span>
              </div>
            </div>
          </a>
        </div>

        <div className="banner banner-short text-in-left">
          <a href="/shop">
            <div
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                height: "259px",
              }}
              className="banner-bg"
            >
              <div className="caption">
                <div className="banner-info">
                  <h3 className="title">
                    <strong>Khám phá</strong>
                    <br /> Điện thoại mới nhất, giá tốt nhất!
                  </h3>
                </div>
                <span className="price">Ưu đãi hấp dẫn</span>
                <span className="banner-action button">Mua ngay</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
