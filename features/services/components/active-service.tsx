import ReusableDropdown from "@/components/common/dropdown";
import React, { useMemo, useState } from "react";
import { Users, Layers, Wrench } from "lucide-react";
import CreateCard from "@/features/rooms/components/create-card";
import RecentServices from "./recent-services";
import { useRouter } from "next/navigation";
import Modal from "@/components/common/modal";
import CreateService from "./create-service";

export interface Services {
  id: string;
  name: string;
  description: string;
  color: string;
  status: "Active" | "Inactive";
  staffAssiged: number;
  subServices: number;
}

const services: Services[] = [
  {
    id: "1",
    name: "Room Cleaning",
    description: "Daily housekeeping and room maintenance",
    color: "#dbc8f7", // darker soft green
    status: "Active",
    staffAssiged: 8,
    subServices: 1,
  },
  {
    id: "2",
    name: "Free Wi-Fi",
    description: "High-speed internet across the property",
    color: "#b2c6f2", // darker soft blue
    status: "Active",
    staffAssiged: 2,
    subServices: 7,
  },
  {
    id: "3",
    name: "Airport Pickup",
    description: "Paid airport pickup & drop service",
    color: "#9cf7c2", // darker soft orange
    status: "Active",
    staffAssiged: 8,
    subServices: 4,
  },
  {
    id: "4",
    name: "Breakfast",
    description: "Complimentary buffet breakfast",
    color: "#f6cc99", // darker soft purple
    status: "Active",
    staffAssiged: 8,
    subServices: 10,
  },
  {
    id: "5",
    name: "Swimming Pool",
    description: "Outdoor pool access (7 AM – 9 PM)",
    color: "#f69ece", // darker soft cyan
    status: "Inactive",
    staffAssiged: 0,
    subServices: 2,
  },
  {
    id: "6",
    name: "Gym Access",
    description: "24/7 fitness center access",
    color: "#a3f8e5", // darker soft grey
    status: "Active",
    staffAssiged: 3,
    subServices: 4,
  },
];

function ActiveService() {
  const dropDown = ["Active", "Inactive"] as const;
  const [filter, setFilter] = useState<"Active" | "Inactive">("Active");
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const filteredServices = useMemo(
    () => services.filter((service) => service.status === filter),
    [filter],
  );

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Left Section */}
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-[1.5rem] font-semibold text-[#151a2c]">Services</p>

          <ReusableDropdown
            options={dropDown}
            value={filter}
            onChange={setFilter}
          />
        </div>

        {/* Services Grid */}
        <div className="mt-4 grid grid-cols-4 gap-4">
          {/* Add New Service Card */}
          <CreateCard
            title="Add Service"
            description="Add a new service"
            icon={Wrench}
            accentColor="#4c6edb"
            backgroundColor="#eef3ff"
            onClick={() => setShowModal(true)}
            className="h-[150px] w-full"
          />

          {/* Service Cards */}
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => router.push(`/services/${service.id}`)}
              className="relative h-[150px] rounded-xl p-4
               flex flex-col justify-between cursor-pointer
               transition hover:-translate-y-0.5
               border border-black/5 hover:shadow-md"
              style={{ backgroundColor: service.color }}
            >
              {/* Left Accent */}
              <div className="absolute left-0 top-0 h-full w-[4px] rounded-l-xl bg-black/10" />

              {/* Top Content */}
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="h-9 w-9 rounded-lg bg-black/5 flex items-center justify-center">
                  <Layers size={16} className="text-[#151a2c]" />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#151a2c]">
                    {service.name}
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="flex items-center justify-between">
                {/* Counts */}
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span className="font-medium text-[#151a2c]">
                      {service.staffAssiged}
                    </span>
                    <span>Staff</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Layers size={14} />
                    <span className="font-medium text-[#151a2c]">
                      {service.subServices}
                    </span>
                    <span>Sub</span>
                  </div>
                </div>

                {/* Status */}
                <span
                  className={`text-[11px] px-2 py-[2px] rounded-full font-medium
          ${
            service.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
                >
                  {service.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <Modal
          modalBoxClassName=" w-[380px] rounded-[1.6rem] p-[.5rem]"
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Create Service"
          titleClass="text-center text-[#1c1d4e] text-[1.4rem] font-semibold"
        >
          <CreateService />
        </Modal>
      )}

      <RecentServices />
    </div>
  );
}

export default ActiveService;
