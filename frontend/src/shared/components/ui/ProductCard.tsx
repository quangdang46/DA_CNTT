import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/shared/types/ProductTypes";
import { Heart } from "lucide-react";

interface ProductProps {
  product: Product;
}
export default function ProductCard({ product }: ProductProps) {
  return (
    <div className="product">

      <div className="wish-list">
        <div className="button_add_to_wishlist" >
          <Heart strokeWidth={1} size={30}/>
        </div>
      </div>
      <Link
        href={`/details/${product.slug}`}
        className="woocommerce-LoopProduct-link"
      >
        <Image
          src={product.images[0].image_url}
          alt={product.name}
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
        <h2 className="woocommerce-loop-product__title">{product.name}</h2>
      </Link>
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
