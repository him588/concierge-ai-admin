"use client";
import React, { createContext, useContext, useMemo, useState } from "react";
import { ServiceContextType } from "./types/types";
import Modal from "@/components/common/modal";
import CreateService from "@/features/services/components/create-service";
import CreateStaff from "@/features/services/components/create-staff";

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiveContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeTab, setActiveTab] = useState<"Services" | "Staff">("Services");
  const [serviceModal, setServiceModal] = useState<"Services" | "Staff" | null>(
    null,
  );

  const contextValue: ServiceContextType = useMemo(() => {
    return {
      activeTab,
      setActiveTab,
      serviceModal,
      setServiceModal,
    };
  }, [activeTab, serviceModal]);

  return (
    <ServiceContext.Provider value={contextValue}>
      {children}
      {serviceModal && (
        <Modal
          modalBoxClassName="rounded-[1.6rem] p-[.5rem] w-auto"
          isOpen={serviceModal !== null}
          onClose={() => setServiceModal(null)}
          title={serviceModal === "Services" ? "Create Service" : "Add Staff"}
          titleClass="text-center text-[#1c1d4e]  text-[1.4rem] font-semibold"
        >
          {serviceModal === "Services" ? (
            <CreateService onClose={() => setServiceModal(null)} />
          ) : (
            <CreateStaff onClose={() => setServiceModal(null)} />
          )}
        </Modal>
      )}
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
