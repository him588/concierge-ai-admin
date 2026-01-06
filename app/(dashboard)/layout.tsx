import Sidebar from "@/components/common/sidebar";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-hidden relative p-[1rem] flex gap-[3rem] bg-[#ffffff]">
      {/* <div className="absolute left-[200px] h-[200px] w-[200px] blur-[300px] opacity-90 bottom-0 bg-[#C11C84] animate-floatX" />
      <div className="absolute right-[200px] h-[200px] w-[200px] blur-[150px] opacity-50  -bottom-[100px] bg-[#dc00dc] animate-floatY" />
      <div className="absolute right-[200px] h-[300px] w-[300px] blur-[400px] left-[50%] -translate-x-[50%]   -top-[100px] bg-[#008000] animate-floatXY" /> */}

      <div className=" min-w-[20%] relative z-50 h-full">
        <Sidebar />
      </div>
      <div className="w-[80%] pt-[2rem] pr-[2rem] scrollbar-hide overflow-y-scroll ">
        {children}
      </div>
    </div>
  );
}

export default Layout;
