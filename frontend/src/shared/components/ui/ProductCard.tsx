import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/shared/types/ProductTypes";
import { Heart } from "lucide-react";
import { useWishlist } from "@/shared/hooks/useWishlist";

interface ProductProps {
  product: Product;
  onAddToCompare: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}
export default function ProductCard({
  product,
  onAddToCompare,
  onAddToCart,
}: ProductProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  return (
    <div className="product">
      <div className="wish-list" onClick={() => toggleWishlist(product.id)}>
        <div className="button_add_to_wishlist">
          <Heart
            strokeWidth={1}
            size={30}
            fill={`${isInWishlist(product.id) ? "red" : "none"}`}
          />
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
        <button
          className="button add_to_cart_button"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
        <button
          className="add-to-compare-link"
          onClick={() => onAddToCompare(product)}
        >
          Add to Compare
        </button>
      </div>
    </div>
  );
}
