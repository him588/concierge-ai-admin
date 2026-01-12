import { BedDouble } from "lucide-react";
import React from "react";
import room from "../room";
import EmptyState from "./empty-state";
import { RoomCategoryListCard } from "./category-card";
import { useGetRoomTypes } from "@/components/hooks/use-api";
import Shimmer from "@/components/common/shimmer";
import { RoomCategoryType } from "@/components/types/types";

function RoomCategory() {
  const { error, isLoading, data } = useGetRoomTypes();
  console.log("roo  details data", data?.data);
  const roomTypes = (data?.data.roomTypes as [RoomCategoryType]) || [];

  return (
    <>
      <h2 className="mb-4 text-lg font-semibold text-[#1c1d4e]">Rooms</h2>
      {isLoading && <Shimmer />}

      {data?.data?.roomTypes?.length === 0 && !isLoading ? (
        <EmptyState
          title="No rooms created"
          description="Add rooms to start managing bookings"
          icon={BedDouble}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {roomTypes.map((category) => (
            <RoomCategoryListCard
              key={category._id}
              category={category}
              accentColor="#425b73"
            />
          ))}
        </div>
      )}
    </>
  );
}

export default RoomCategory;
