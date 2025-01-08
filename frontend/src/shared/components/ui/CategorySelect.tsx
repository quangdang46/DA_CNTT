"use client";

import React from "react";
import { FormSelect } from "react-bootstrap";
import { UseFormRegister } from "react-hook-form";

type CategorySelectProps = {
  register: UseFormRegister<{ s: string; product_cat: string }>;
  error?: string;
};


export default function CategorySelect({
  register,
  error,
}: CategorySelectProps) {
  return (
    <div className="search-categories input-group-addon">
      <FormSelect
        id="product_cat"
        className="postform resizeselect"
        {...register("product_cat")}
        isInvalid={!!error}
      >
        <option value="0" defaultValue={"0"}>
          All Categories
        </option>
        <option value="pc-components" className="level-0">
          PC Components
        </option>{" "}
        <option value="pc-components" className="level-0">
          PC Components
        </option>{" "}
        <option value="pc-components" className="level-0">
          PC Components
        </option>{" "}
        <option value="pc-components" className="level-0">
          PC Components
        </option>{" "}
        <option value="pc-components" className="level-0">
          PC Components
        </option>
      </FormSelect>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
