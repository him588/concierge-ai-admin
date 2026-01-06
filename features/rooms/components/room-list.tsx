import { BedDouble } from "lucide-react";
import React, { useState } from "react";
import EmptyState from "./empty-state";

function RoomList() {
  const [rooms, setRooms] = useState([]);
  return (
    <>
      <h2 className="mb-4 text-lg font-semibold text-[#1c1d4e]">Rooms</h2>

      {rooms.length === 0 ? (
        <EmptyState
          title="No rooms created"
          description="Add rooms to start managing bookings"
          icon={BedDouble}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Room cards later */}
        </div>
      )}
    </>
  );
}

export default RoomList;
