import { BedDouble } from "lucide-react";
import React, { useMemo, useState } from "react";
import EmptyState from "./empty-state";
import { RoomCard } from "./room-card";
import { useGetRooms } from "@/components/hooks/use-api";
import Shimmer from "@/components/common/shimmer";
import { Room } from "@/components/types/types";

function RoomList() {
  // const [rooms, setRooms] = useState(DUMMY_ROOMS);

  const { data, isLoading } = useGetRooms();

  const rooms: Room[] = useMemo(() => {
    return data?.data.rooms || [];
  }, [data?.data]);

  return (
    <>
      <h2 className="mb-4 text-lg font-semibold text-[#1c1d4e]">Rooms</h2>

      {isLoading && <Shimmer />}

      {rooms.length === 0 && !isLoading ? (
        <EmptyState
          title="No rooms created"
          description="Add rooms to start managing bookings"
          icon={BedDouble}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} accentColor="#425b73" />
          ))}
        </div>
      )}
    </>
  );
}

export default RoomList;
