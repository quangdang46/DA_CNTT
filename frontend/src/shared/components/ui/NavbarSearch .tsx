"use client";
import CategorySelect from "@/shared/components/ui/CategorySelect";
import SearchButton from "@/shared/components/ui/SearchButton";
import SearchField from "@/shared/components/ui/SearchField";
import React from "react";
import { Form, InputGroup, FormLabel } from "react-bootstrap";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
  s: z.string().min(1, "Search query is required"),
  product_cat: z.string().min(1, "Please select a category"),
});
export default function NavbarSearch() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      s: "",
      product_cat: "0",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
  
    console.log(values);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="navbar-search">
      <FormLabel htmlFor="search" className="sr-only screen-reader-text">
        Search for:
      </FormLabel>
      <InputGroup>
        <SearchField
          register={register}
          error={errors.s?.message}
        ></SearchField>
        <CategorySelect
          register={register}
          error={errors.product_cat?.message}
        ></CategorySelect>
        <SearchButton></SearchButton>
      </InputGroup>
    </Form>
  );
}
