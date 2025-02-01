"use client";

import { categoryApiRequest } from "@/shared/apiRequests/category";
import { ProductSearchV2Type } from "@/shared/types/ProductTypes";
import React from "react";
import { UseFormRegister } from "react-hook-form";

type CategorySelectProps = {
  register: UseFormRegister<ProductSearchV2Type>;
  error?: string;
};

export default function CategorySelect({ register }: CategorySelectProps) {
  const { data: categories } = categoryApiRequest.useGetCategories();
  return (
    <div className="input-group-addon search-categories">
      <select
        id="product_cat"
        className="postform resizeselect"
        style={{ width: "158.015px" }}
        {...register("categories")}
      >
        <option defaultValue={-1}>All Categories</option>
        {categories?.data.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
