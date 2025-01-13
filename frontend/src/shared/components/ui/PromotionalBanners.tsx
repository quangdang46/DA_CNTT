import React from "react";

export default function PromotionalBanners() {
  return (
    <div className="banners">
      <div className="row">
        <div className="banner banner-long text-in-right">
          <a href="/shop">
            <div
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
                  "url('https://images.unsplash.com/photo-1736401762820-a114e32f0072?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                height: "259px",
              }}
              className="banner-bg"
            >
              <div className="caption">
                <div className="banner-info">
                  <h3 className="title">
                    <strong>1000 mAh</strong>
                    <br /> Power Bank Pro.
                  </h3>
                </div>
                <span className="price">$34.99</span>
                <span className="banner-action button">Buy Now</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
