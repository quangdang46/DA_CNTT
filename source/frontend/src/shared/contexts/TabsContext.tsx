import React, { createContext, useContext, useState } from "react";

// Định nghĩa context
const TabsContext = createContext<{
  activeTab: string;
  setActiveTab: (type: string) => void;
} | null>(null);

// Provider để quản lý trạng thái
export const TabsProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState("on-sale");

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
};

// Hook để dùng context
export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs phải được dùng trong TabsProvider");
  }
  return context;
};
