"use client";

import React from "react";
import { FormControl } from "react-bootstrap";
import { UseFormRegister } from "react-hook-form";

type SearchFieldProps = {
  register: UseFormRegister<{ s: string; product_cat: string }>;
  error?: string;
};
export default function SearchField({ register, error }: SearchFieldProps) {
  return (
    <>
      <FormControl
        type="text"
        id="search"
        className="search-field product-search-field"
        dir="ltr"
        placeholder="Search for products"
        {...register("s")}
        isInvalid={!!error}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </>
  );
}
