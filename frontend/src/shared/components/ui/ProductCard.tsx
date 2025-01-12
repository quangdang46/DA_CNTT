import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  product: {
    imageUrl: string;
    title: string;
    price: number;
  };
}

export default function ProductCard({ product }: ProductProps) {
  return (
    <div className="product">
      <div className="yith-wcwl-add-to-wishlist">
        <Link href="wishlist.html" rel="nofollow" className="add_to_wishlist">
          Add to Wishlist
        </Link>
      </div>
      <a
        href="single-product-fullwidth.html"
        className="woocommerce-LoopProduct-link"
      >
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={224}
          height={130}
          className="wp-post-image"
        />
        <span className="price">
          <ins>
            <span className="amount"></span>
          </ins>
          <span className="amount">{product.price}</span>
        </span>
        <h2 className="woocommerce-loop-product__title">{product.title}</h2>
      </a>
      <div className="hover-area">
        <Link
          href="cart.html"
          className="button add_to_cart_button"
          rel="nofollow"
        >
          Add to Cart
        </Link>
        <Link href="compare.html" className="add-to-compare-link">
          Add to Compare
        </Link>
      </div>
    </div>
  );
}
