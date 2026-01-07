import { BedDouble } from "lucide-react";
import React, { useState } from "react";
import EmptyState from "./empty-state";
import { RoomCard } from "./room-card";

/* ---------- Dummy Room Data ---------- */
const DUMMY_ROOMS = [
  {
    id: "1",
    roomNumber: "101",
    category: "Deluxe Room",
    floor: "1",
    maxGuest: 2,
    isAvailable: true,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    ],
    isUnderMaintenance: false,
  },
  {
    id: "2",
    roomNumber: "202",
    category: "Suite Room",
    floor: "2",
    maxGuest: 4,
    isAvailable: false,
    images: [
      "https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32",
      "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9",
    ],
    isUnderMaintenance: false,
  },
  {
    id: "3",
    roomNumber: "305",
    category: "Standard Room",
    floor: "3",
    maxGuest: 2,
    isAvailable: true,
    images: ["https://images.unsplash.com/photo-1610123172763-1f587473048f"],
    isUnderMaintenance: false,
  },
];

function RoomList() {
  const [rooms, setRooms] = useState(DUMMY_ROOMS);

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
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} accentColor="#425b73" />
          ))}
        </div>
      )}
    </>
  );
}

export default RoomList;
