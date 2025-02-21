
"use client";
import {
  ProductListResType,
  ProductSearchResType,
} from "@/shared/types/ProductTypes";
import { ResType } from "@/shared/types/resType";
import { EmblaCarouselType } from "embla-carousel";
import React, { createContext, useContext, useState } from "react";

// Tạo interface cho dữ liệu context
interface ShopContextProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  products: ProductListResType;
  setProducts: (products: ProductListResType) => void;
  data: ResType<ProductSearchResType>;
  setData: (data: ResType<ProductSearchResType>) => void;
  emblaApi: EmblaCarouselType | null;
  setEmblaApi: React.Dispatch<React.SetStateAction<EmblaCarouselType | null>>;
}

// Giá trị mặc định của context
const ShopContext = createContext<ShopContextProps | undefined>(undefined);

// Provider
export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeTab, setActiveTab] = useState<string>("grid-view");
  const [products, setProducts] = useState<ProductListResType>([]);
  const [data, setData] = useState<ResType<ProductSearchResType>>(
    {} as ResType<ProductSearchResType>
  );
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null);

  return (
    <ShopContext.Provider
      value={{
        activeTab,
        setActiveTab,
        products,
        setProducts,
        data,
        setData,
        emblaApi,
        setEmblaApi,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

// Custom hook để sử dụng context
export const useShopContext = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShopContext must be used within a ShopProvider");
  }
  return context;
};