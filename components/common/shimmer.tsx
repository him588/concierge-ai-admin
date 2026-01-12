import React from "react";

function Shimmer() {
  return (
    <div className=" grid grid-cols-3 grid-rows-1 gap-4  ">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="skeleton h-26 w-full bg-gray-100 ">
          {" "}
        </div>
      ))}
    </div>
  );
}

export default Shimmer;
