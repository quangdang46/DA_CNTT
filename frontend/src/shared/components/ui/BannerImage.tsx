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
            backgroundImage: "url('/static/images/banner/banner-home.jpg')",
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
              <MoveRight />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
