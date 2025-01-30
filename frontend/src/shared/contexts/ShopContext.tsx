"use client";
import {
  ProductListResType,
  ProductSearchResType,
} from "@/shared/types/ProductTypes";
import { ResType } from "@/shared/types/resType";
import React, { createContext, useContext, useState } from "react";

// Tạo interface cho dữ liệu context
interface ShopContextProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  products: ProductListResType;
  setProducts: (products: ProductListResType) => void;
  data: ResType<ProductSearchResType>;
  setData: (data: ResType<ProductSearchResType>) => void;
}

// Interface cho sản phẩm

// Giá trị mặc định của context
const ShopContext = createContext<ShopContextProps>({
  activeTab: "all",
  setActiveTab: () => {},
  products: [],
  setProducts: () => {},
  data: {} as ResType<ProductSearchResType>,
  setData: () => {},
});

// Provider
export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeTab, setActiveTab] = useState<string>("grid-view");
  const [products, setProducts] = useState<ProductListResType>([]);
  const [data, setData] = useState<ResType<ProductSearchResType>>(
    {} as ResType<ProductSearchResType>
  );

  return (
    <ShopContext.Provider
      value={{ activeTab, setActiveTab, products, setProducts, data, setData }}
    >
      {children}
    </ShopContext.Provider>
  );
};

// Custom hook để sử dụng context
export const useShopContext = () => useContext(ShopContext);
