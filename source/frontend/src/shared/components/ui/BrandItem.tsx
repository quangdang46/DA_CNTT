import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BrandItem() {
  return (
    <div className="item">
      <Link href="/shop">
        <figure className="p-1">
          <figcaption className="text-overlay">
            <div className="info">
              <h4>apple</h4>
            </div>
          </figcaption>
          <Image
            src="/static/images/brands/1.png"
            alt="apple"
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className="img-responsive desaturate"
          />
        </figure>
      </Link>
    </div>
  );
}
