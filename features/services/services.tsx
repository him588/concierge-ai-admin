"use client";
import { useState } from "react";
import Service from "./components/service";
import Staff from "./components/staff";
import EmptyState from "@/components/common/empty-state";
import { useServiceContext } from "@/context/service-context";

export default function Services() {
  const { activeTab } = useServiceContext();
  return (
    <div className=" relative ">
      {/* Toggle Container */}

      {/* Content */}
      <div className="w-full  ">
        {activeTab === "Services" ? <Service /> : <Staff />}
      </div>
    </div>
  );
}
