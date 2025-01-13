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
            src="https://images.unsplash.com/photo-1693533846949-5df11d41642e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="apple"
            width={300}
            height={50}
            className="img-responsive desaturate"
          />
        </figure>
      </Link>
    </div>
  );
}
