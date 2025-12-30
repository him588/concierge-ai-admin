"use client";
import { ResponsiveLine } from "@nivo/line";
import { useState } from "react";
import { ChartData } from "../types/type";

type TimeFilter = "week" | "month" | "year";

type ChartProps = {
  weekData: ChartData;
  monthData: ChartData;
  yearData: ChartData;
  primaryColor: string;
  secondaryColor: string;
  title: string;
};

const StatsLineChart = ({
  weekData,
  monthData,
  yearData,
  primaryColor,
  secondaryColor,
  title,
}: ChartProps) => {
  const [filter, setFilter] = useState<TimeFilter>("week");

  const filterMap = {
    week: weekData,
    month: monthData,
    year: yearData,
  };

  return (
    <div className="w-full h-[320px] bg-white rounded-[20px] py-4 mt-[2rem]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 mb-5">
        <p className="text-[1.4rem] font-semibold text-[#1f2937]">{title}</p>

        <span
          onClick={() => console.log("View more clicked")}
          className="cursor-pointer text-sm font-medium text-[#1f2937] hover:underline"
        >
          View more
        </span>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-1 px-4">
        {(["week", "month", "year"] as TimeFilter[]).map((item) => (
          <span
            key={item}
            onClick={() => setFilter(item)}
            style={{
              backgroundColor: filter === item ? primaryColor : secondaryColor,
              color: filter === item ? "#ffffff" : primaryColor,
            }}
            className="cursor-pointer px-3 py-1 rounded-full text-sm font-semibold transition-all"
          >
            This {item}
          </span>
        ))}
      </div>

      {/* Chart */}
      <div className="h-[240px]">
        <ResponsiveLine
          data={filterMap[filter]}
          margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
          }}
          curve="monotoneX"
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
          }}
          colors={[primaryColor]}
          pointSize={6}
          pointBorderWidth={2}
          pointColor="#ffffff"
          pointBorderColor={primaryColor}
          enableArea
          areaOpacity={0.12}
          useMesh
        />
      </div>
    </div>
  );
};

export default StatsLineChart;
