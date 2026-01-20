/* eslint-disable @next/next/no-img-element */
import { Bell, Search } from "lucide-react";
import React from "react";
import OverviewSection from "./components/overview-section";
import BookingListCard from "./components/side-panel";
import SupportCard from "./components/buy-premium";
import Header from "@/components/common/header";

function Overview() {
  return (
    <section className="w-full h-full outline-none ">
      <div className="w-full flex gap-[2.5rem]">
        <div className=" w-[70%] ">
          <OverviewSection />
        </div>
        <div className="  h-fit  w-[30%] flex flex-col gap-[2rem]  ">
          <div className="p-3 border-[2px] rounded-[2rem] shadow-md">
            <BookingListCard />
          </div>
          <SupportCard />
        </div>
      </div>
    </section>
  );
}

export default Overview;
