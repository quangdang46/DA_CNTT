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
              "url('https://images.unsplash.com/photo-1735290675000-236a69c7542d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            height: "236px",
          }}
          className="banner-bg"
        >
          <div className="caption">
            <div className="banner-info">
              <h3 className="title">
                <strong>Extremely Portable</strong>, learn
                <br /> to ride in just 3 minutes
              </h3>
              <h4 className="subtitle">Travel up to 22km in a single charge</h4>
            </div>
            <span className="banner-action button">
              Browse now
              <i className="feature-icon d-flex ml-4 tm tm-long-arrow-right"></i>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
