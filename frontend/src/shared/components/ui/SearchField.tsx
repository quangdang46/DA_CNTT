"use client";

import { ProductSearchV2Type } from "@/shared/types/ProductTypes";
import React from "react";
import { UseFormRegister } from "react-hook-form";

type SearchFieldProps = {
  register: UseFormRegister<ProductSearchV2Type>;
  error?: string;
};
export default function SearchField({ register, error }: SearchFieldProps) {
  return (
    <>
      <input
        type="text"
        id="search"
        className="form-control search-field product-search-field"
        dir="ltr"
        defaultValue=""
        {...register("name")}
        placeholder="Nhập tên sản phẩm..."
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </>
  );
}
