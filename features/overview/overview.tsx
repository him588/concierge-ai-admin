/* eslint-disable @next/next/no-img-element */
import { Bell, Search } from "lucide-react";
import React from "react";
import OverviewSection from "./components/overview-section";
import BookingListCard from "./components/side-panel";
import SupportCard from "./components/buy-premium";

function Overview() {
  return (
    <section className="w-full h-full overflow-y-scroll   gap-[2.5rem]">
      <div className=" flex gap-[2rem]  justify-between ">
        <div className=" w-[70%]  pt-[.5rem]">
          <div className=" flex gap-[1rem]  items-center">
            <Search size={20} color="#1a1e1d" />
            <input
              type="text"
              placeholder="search"
              className="text-[#b4bcb9] placeholder:text-[#b4bcb9] w-full outline-none"
            />
          </div>
          <span className=" block mt-[2rem] h-[1.5px] w-full bg-[#ebf0ee]" />
        </div>
        <div className=" flex w-[30%] h-[40px]  justify-between">
          <div className=" h-[40px] w-[40px] text-[#9fa4ad] bg-white relative flex  items-center justify-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] cursor-pointer  rounded-full ">
            <span className=" h-[12px] rounded-full w-[12px] absolute right-[1px] top-[1px] bg-[#ea6993]"></span>
            <Bell size={19} />
          </div>
          <div className="flex items-center justify-center gap-[1rem]">
            <p className=" text-[#454545] text-[16px]  font-semibold">
              William Dawson
            </p>
            <img
              src="https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
              alt=""
              className=" h-[40px] w-[40px] object-cover rounded-full"
            />
          </div>
        </div>
      </div>
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
