import React from "react";
import StatsCard from "./stats-card";
import StatsLineChart from "./line-chart";
import { monthData, weekData, yearData } from "./content";

function OverviewSection() {
  return (
    <section className=" h-full w-full">
      <p className="mt-[2rem] text-[3rem] font-semibold text-[#d3d6d5]">
        Welcome, <span className="text-[#2a2a2a]"> William </span>
      </p>
      <p className="text-[#2a2a2a] font-normal font-semibold text-sm">
        You have{" "}
        <span className=" underline underline-offset-2 cursor-pointer decoration-[1.5px]">
          {" "}
          10 rooms free{" "}
        </span>{" "}
        at la-di-capria
      </p>
      <div className=" flex gap-[1.5rem]   w-full mt-[2.5rem]">
        <StatsCard
          title="Booking"
          percentage="4%"
          textColor="#16a34a"
          backgroundColor="#ecfdf5"
          stats={[
            { label: "Booked", value: 30 },
            { label: "Check In", value: 10 },
          ]}
        />
        <StatsCard
          title="Services"
          percentage="50%"
          textColor="#6b5c85"
          backgroundColor="#f6ecff"
          stats={[
            { label: "Total", value: 10 },
            { label: "Booked", value: 5 },
          ]}
        />
        <StatsCard
          title="Staff"
          percentage="4%"
          textColor="#6b4b5c"
          backgroundColor="#ffe6f7"
          stats={[
            { label: "Total", value: 30 },
            { label: "Active", value: 10 },
          ]}
        />
      </div>

      <StatsLineChart
        weekData={weekData}
        monthData={monthData}
        yearData={yearData}
        primaryColor="#6b4b5c"
        secondaryColor="#ffe6f7"
        title="Booking Info"
      />

      <StatsLineChart
        weekData={weekData}
        monthData={monthData}
        yearData={yearData}
        primaryColor="#6b5c85"
        secondaryColor="#f6ecff"
        title="Services Info"
      />

      <StatsLineChart
        weekData={weekData}
        monthData={monthData}
        yearData={yearData}
        primaryColor="#6b4b5c"
        secondaryColor="#ffe6f7"
        title="Staff Record"
      />
    </section>
  );
}

export default OverviewSection;
