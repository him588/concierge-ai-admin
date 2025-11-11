"use client";
/* eslint-disable @next/next/no-img-element */
import {
  BellRing,
  ChartSpline,
  DollarSign,
  KeyRound,
  MapPinHouse,
  Settings,
  UsersRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { JSX, useState } from "react";

type Page = {
  name: string;
  icon: JSX.Element;
  isActive: boolean;
  route: string;
};

export default function Sidebar() {
  const router = useRouter();
  const [pages, setPages] = useState<Page[]>([
    {
      name: "OverView",
      icon: <ChartSpline size={17} />,
      isActive: true,
      route: "/overview",
    },
    {
      name: "Rooms",
      icon: <KeyRound size={17} />,
      isActive: false,
      route: "/rooms",
    },
    {
      name: "Services",
      icon: <MapPinHouse size={17} />,
      isActive: false,
      route: "/services",
    },
    {
      name: "Earnings",
      icon: <DollarSign size={17} />,
      isActive: false,
      route: "/earnings",
    },
    {
      name: "Guests",
      icon: <UsersRound size={17} />,
      isActive: false,
      route: "/guests",
    },
  ]);

  const handlePageClick = (index: number, route: string) => {
    // Update active state
    setPages((prevPages) =>
      prevPages.map((page, i) => ({
        ...page,
        isActive: i === index,
      }))
    );
    // Navigate to route
    router.push(route);
  };

  return (
    <div className="h-full w-full flex flex-col justify-between bg-white rounded-3xl shadow-[0_3px_10px_rgb(0,0,0,0.1)] px-[1.5rem] py-[2rem]">
      {/* Logo */}
      <div className="flex items-center gap-[1rem]">
        <img src="/logo.png" className="h-[2.5rem] object-cover" alt="Logo" />
        <p className="text-[1.5rem] font-bold text-[#1c1d4e]">
          Concierge <span className="text-[#d5d5d5]">AI</span>
        </p>
      </div>

      {/* Sidebar menu */}
      <div className="-mt-[4rem] flex flex-col gap-[.2rem]">
        {pages.map((page, index) => (
          <div
            key={index}
            onClick={() => handlePageClick(index, page.route)}
            className={`h-[3rem] rounded-md cursor-pointer w-full flex items-center gap-[1rem] px-[1rem] transition-colors duration-150
              ${
                page.isActive
                  ? "bg-[#f9f9f9] text-[#1c1d4e]"
                  : "text-[#92959f] hover:bg-[#f9f9f9]"
              }`}
          >
            <span>{page.icon}</span>
            <p className="text-[15px]">{page.name}</p>
          </div>
        ))}
      </div>

      {/* Bottom buttons */}
      <div className="flex items-center justify-center gap-[.6rem]">
        <button className="cursor-pointer h-[2.8rem] w-[2.8rem] flex items-center justify-center rounded-full bg-[#ffecf0] text-[#4c4c4c]">
          <BellRing size={17} />
        </button>
        <button className="w-auto h-[3rem] px-[2rem] cursor-pointer flex items-center justify-center bg-[#f9f9f9] text-[14px] gap-[.5rem] rounded-full text-[#818a99]">
          <span className="text-[#4c4c4c]">
            <Settings size={17} />
          </span>
          Settings
        </button>
      </div>
    </div>
  );
}
