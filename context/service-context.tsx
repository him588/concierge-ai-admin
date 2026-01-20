"use client";
import React, { createContext, useContext, useMemo, useState } from "react";
import { ServiceContextType } from "./types/types";

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiveContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeTab, setActiveTab] = useState<"Services" | "Staff">("Services");

  const contextValue: ServiceContextType = useMemo(() => {
    return {
      activeTab,
      setActiveTab,
    };
  }, [activeTab]);

  return (
    <ServiceContext.Provider value={contextValue}>
      {children}
    </ServiceContext.Provider>
  );
};

export function useServiceContext() {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error(
      "useServiceContext must be used within a ServiceContextProvider",
    );
  }
  return context;
}
