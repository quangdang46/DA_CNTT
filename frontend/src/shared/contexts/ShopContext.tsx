"use client";
import { ProductListResType } from "@/shared/types/ProductTypes";
import React, { createContext, useContext, useState } from "react";

// Tạo interface cho dữ liệu context
interface ShopContextProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  products: ProductListResType;
  setProducts: (products: ProductListResType) => void;
}

// Interface cho sản phẩm

// Giá trị mặc định của context
const ShopContext = createContext<ShopContextProps>({
  activeTab: "all",
  setActiveTab: () => {},
  products: [],
  setProducts: () => {},
});

// Provider
export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeTab, setActiveTab] = useState<string>("grid-view");
  const [products, setProducts] = useState<ProductListResType>([]);

  return (
    <ShopContext.Provider
      value={{ activeTab, setActiveTab, products, setProducts }}
    >
      {children}
    </ShopContext.Provider>
  );
};

// Custom hook để sử dụng context
export const useShopContext = () => useContext(ShopContext);
