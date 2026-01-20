"use client";
import { ServiveContextProvider } from "@/context/service-context";
import ToggleHeader from "@/features/services/components/toggle-header";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ServiveContextProvider>
      <div className="relative">
        <ToggleHeader />
        {children}
      </div>
    </ServiveContextProvider>
  );
}

export default Layout;
