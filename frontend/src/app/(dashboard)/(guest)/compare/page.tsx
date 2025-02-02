"use client";
import {  Star, StarHalf, Undo2, X } from "lucide-react";
import WrapperContent from "@/shared/components/layouts/WrapperContent";
import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import { RootState } from "@/shared/state/store";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { removeFromCompare } from "@/shared/state/compareSlice";

const productAttributes = [
  { key: "battery_capacity", label: "Battery Capacity" },
  { key: "battery_type", label: "Battery Type" },
  { key: "camera_resolution", label: "Camera Resolution" },
  { key: "chip", label: "Chip" },
  { key: "dimensions", label: "Dimensions" },
  { key: "operating_system", label: "Operating System" },
  { key: "ram", label: "RAM" },
  { key: "storage", label: "Storage" },
];

export default function Page() {
  const selectedProducts = useSelector(
    (state: RootState) => state.compare.selectedProducts
  );
  const dispatch = useDispatch();
  const renderProductRow = useCallback(
    (key: string, label: string) => (
      <tr key={key}>
        <th>{label}</th>
        {selectedProducts.map((product) => (
          <td key={`${product.id}-${key}`}>
            <span>{product.attributes[key]}</span>
          </td>
        ))}
      </tr>
    ),
    [selectedProducts]
  );

  const renderProductAttributes = useMemo(
    () =>
      productAttributes.map((attr) => renderProductRow(attr.key, attr.label)),
    [renderProductRow]
  );
  const handleRemove = useCallback(
    (productId: string) => {
      dispatch(removeFromCompare(productId));
    },
    [dispatch]
  );
  return (
    <WrapperContent>
      <div
        id="post-467"
        className="post-467 page type-page status-publish hentry"
      >
        <div className="entry-content">
          {selectedProducts.length === 0 && (
            <div className="compare-empty">
              <h1 className="lead-title text-center cart-empty">
                No products were added to the compare table{" "}
              </h1>
              <p className="return-to-shop">
                <Link className="button" href="/">
                  <Undo2 />
                  Return To Shop{" "}
                </Link>
              </p>
            </div>
          )}

          {selectedProducts.length > 0 && (
            <div className="table-responsive">
              <table className="table table-compare compare-list">
                <tbody>
                  <tr>
                    <th>Product</th>
                    {selectedProducts.map((product) => (
                      <td key={product.id}>
                        <a className="product" href={`/product/${product.id}`}>
                          <div className="product-image">
                            <div className="image">
                              <Image
                                width={300}
                                height={300}
                                alt={product.name}
                                className="attachment-shop_catalog size-shop_catalog wp-post-image"
                                src={product.images[0].image_url}
                              />
                            </div>
                          </div>
                          <div className="product-info">
                            <h3 className="product-title">{product.name}</h3>
                            <div className="star-rating">
                              {Array(Math.floor(product.rating))
                                .fill(0)
                                .map((_, i) => (
                                  <Star strokeWidth={1} key={`full-${i}`} />
                                ))}
                              {product.rating % 1 !== 0 && (
                                <StarHalf strokeWidth={1} key="half-star" />
                              )}
                            </div>
                          </div>
                        </a>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th>Price</th>
                    {selectedProducts.map((product) => (
                      <td key={product.id}>
                        <div className="product-price price">
                          <ins>
                            <span className="woocommerce-Price-amount amount">
                              <span className="woocommerce-Price-currencySymbol">
                                {product.price}
                              </span>
                              {product.price}
                            </span>
                          </ins>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th>Availability</th>
                    {selectedProducts.map((product) => (
                      <td key={product.id}>
                        <span>{product.status}</span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th>Description</th>
                    {selectedProducts.map((product) => (
                      <td key={product.id}>
                        <p>{product.description}</p>
                      </td>
                    ))}
                  </tr>
                  {renderProductAttributes}
                  <tr>
                    <th>Add to cart</th>
                    {selectedProducts.map((product) => (
                      <td key={product.id}>
                        <a className="button" href={`/cart/add/${product.id}`}>
                          Add to cart
                        </a>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th>&nbsp;</th>
                    {selectedProducts.map((product) => (
                      <td key={product.id} className="text-center">
                        <a
                          title="Remove"
                          className="remove-icon"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
                            handleRemove(product.id);
                          }}
                        >
                          <X />
                        </a>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </WrapperContent>
  );
}
