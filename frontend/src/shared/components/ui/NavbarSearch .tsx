"use client";
import CategorySelect from "@/shared/components/ui/CategorySelect";
import SearchButton from "@/shared/components/ui/SearchButton";
import SearchField from "@/shared/components/ui/SearchField";
import React, { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { debounce } from "lodash";
import {
  ProductListResType,
  ProductSearchV2,
  ProductSearchV2Type,
} from "@/shared/types/ProductTypes";
import Link from "next/link";
import Image from "next/image";
import productApiRequest from "@/shared/apiRequests/product";
import useClickOutside from "@/shared/hooks/useClickOutside";
import { usePathname, useSearchParams } from "next/navigation";

type LinkSuggestions = {
  link: string;
  name: string;
}[];
export default function NavbarSearch() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null); // Tham chiếu đến vùng gợi ý
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<ProductListResType>(
    [] as ProductListResType
  ); // State to store suggestions
  const [suggestionsLinks, setSuggestionsLinks] = useState<LinkSuggestions>(
    {} as LinkSuggestions
  );
  useClickOutside(containerRef, () => {
    setSuggestions([]); // Xóa gợi ý
    setIsOpen(false);
  });

  useEffect(() => {
    // Khi URL thay đổi, đóng gợi ý và xóa danh sách gợi ý
    setIsOpen(false);
    setSuggestions([]);
  }, [pathname, searchParams]); // Trigger when pathname or searchParams change

  const { register, handleSubmit, watch } = useForm<ProductSearchV2Type>({
    resolver: zodResolver(ProductSearchV2),
    defaultValues: {
      name: "",
      categories: "",
    },
  });

  const searchQuery = watch("name", ""); // Watch the "name" field
  const selectedCategory = watch("categories", ""); // Watch the "categories" field

  useEffect(() => {
    const fetchSuggestions = debounce(async () => {
      if ((searchQuery && searchQuery.length >= 2) || selectedCategory) {
        try {
          const response = await productApiRequest.getSearchProducts({
            name: searchQuery,
            categories: selectedCategory ? [selectedCategory] : [],
          });

          const fetchedData = response?.data?.data || []; // Đảm bảo dữ liệu luôn là mảng
          console.log("Fetched Suggestions:", fetchedData);

          setSuggestions(fetchedData);
          setIsOpen(true); // Chỉ mở khi có tìm kiếm
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]); // Xóa dữ liệu nếu lỗi
          setIsOpen(true);
        }
      } else {
        setSuggestions([]); // Nếu input không hợp lệ, không gọi API
        setIsOpen(false);
      }
    }, 300); // Debounce 300ms

    fetchSuggestions();
    return () => fetchSuggestions.cancel(); // Hủy debounce khi unmount
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    if (Array.isArray(suggestions) && suggestions.length > 0) {
      setSuggestionsLinks(
        suggestions.map((product) => ({
          link: `/shop?name=${encodeURIComponent(product.name)}`,
          name: product.name,
        }))
      );
    } else {
      setSuggestionsLinks([]); // Đảm bảo dữ liệu luôn đúng kiểu
    }
  }, [suggestions]);

  // Handle form submission
  const onSubmit = (values: ProductSearchV2Type) => {
    console.log("Form submitted with values:", values);
  };

  return (
    <>
      <form className="navbar-search" onSubmit={handleSubmit(onSubmit)}>
        <label className="sr-only screen-reader-text" htmlFor="search">
          Search for:
        </label>
        <div className="input-group">
          <SearchField register={register}></SearchField>
          <CategorySelect register={register}></CategorySelect>
          <SearchButton></SearchButton>
        </div>

        {isOpen && (
          <div ref={containerRef} className="suggest-result">
            {suggestions.length > 0 ? (
              <>
                <ul className="suggest-link-list">
                  {suggestionsLinks.map((link, index) => (
                    <li key={index} className="suggest-link">
                      <Link href={link.link} className="suggest-link-item">
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="product-suggest">
                  <h5>Suggested products</h5>
                  <ul className="product-suggest-list">
                    {suggestions.map((product) => (
                      <li key={product.id} className="product-suggest-item">
                        <Link
                          href={`/details/${product.slug}`}
                          className="product-suggest-link"
                        >
                          <Image
                            src={product.images[0].image_url}
                            alt={product.name}
                            width={100}
                            height={50}
                          />
                          <div>
                            <h6>{product.name}</h6>
                            <span>{product.price} VND</span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <h1>Không tìm thấy sản phẩm</h1>
            )}
          </div>
        )}
      </form>
    </>
  );
}
