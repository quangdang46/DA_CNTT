// contexts/GalleryContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type GalleryContextType = {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  thumbnails: string[];
  setThumbnails: (thumbnails: string[]) => void;
};

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const GalleryProvider = ({ children }: { children: ReactNode }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [thumbnails, setThumbnails] = useState<string[]>([]); // Cho phép cập nhật động

  return (
    <GalleryContext.Provider
      value={{ selectedIndex, setSelectedIndex, thumbnails, setThumbnails }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export const useGalleryContext = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error("useGalleryContext must be used within a GalleryProvider");
  }
  return context;
};
