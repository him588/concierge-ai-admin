"use client";

import { Dispatch, SetStateAction, useMemo, useState } from "react";

interface Room {
  id: string;
  number: string;
  category: string;
  status: "available" | "booked" | "checked_in" | "maintenance";
}

type props = {
  setCurrentModal: Dispatch<
    SetStateAction<"createCategory" | "createRoom" | "BookRoom" | null>
  >;
};

/* ---------- Mock Rooms ---------- */
const ROOMS: Room[] = [
  { id: "1", number: "101", category: "Standard", status: "available" },
  { id: "2", number: "102", category: "Standard", status: "booked" },
  { id: "3", number: "103", category: "Standard", status: "checked_in" },
  { id: "4", number: "104", category: "Standard", status: "available" },
  { id: "5", number: "105", category: "Standard", status: "maintenance" },

  { id: "6", number: "201", category: "Deluxe", status: "available" },
  { id: "7", number: "202", category: "Deluxe", status: "booked" },
  { id: "8", number: "203", category: "Deluxe", status: "checked_in" },
  { id: "9", number: "204", category: "Deluxe", status: "available" },
  { id: "10", number: "205", category: "Deluxe", status: "maintenance" },

  { id: "11", number: "301", category: "Suite", status: "available" },
  { id: "12", number: "302", category: "Suite", status: "booked" },
  { id: "13", number: "303", category: "Suite", status: "checked_in" },
  { id: "14", number: "304", category: "Suite", status: "available" },
  { id: "15", number: "305", category: "Suite", status: "maintenance" },
];

function RoomAvailabilityGrid(props: props) {
  const { setCurrentModal } = props;
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredRooms = useMemo(() => {
    return ROOMS.filter((room) => {
      const statusMatch =
        statusFilter === "all" || room.status === statusFilter;

      const categoryMatch =
        categoryFilter === "All" || room.category === categoryFilter;

      return statusMatch && categoryMatch;
    });
  }, [statusFilter, categoryFilter]);

  return (
    <div className="space-y-4">
      {/* Header + Filters */}
      {/* Header + Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Room Availability
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter Pills */}
          <div className="flex rounded-xl  gap-1">
            {[
              {
                key: "all",
                label: "All",
                styles: "border-gray-300 bg-gray-50 text-gray-700",
              },
              {
                key: "available",
                label: "Available",
                styles: "border-green-300 bg-green-50 text-green-700",
              },
              {
                key: "booked",
                label: "Booked",
                styles: "border-blue-300 bg-blue-50 text-blue-700",
              },
              {
                key: "checked_in",
                label: "Checked In",
                styles: "border-yellow-300 bg-yellow-50 text-yellow-700",
              },
              {
                key: "maintenance",
                label: "Maintenance",
                styles: "border-red-300 bg-red-50 text-red-700",
              },
            ].map((item) => {
              const active = statusFilter === item.key;

              return (
                <button
                  key={item.key}
                  onClick={() => setStatusFilter(item.key)}
                  className={`
          rounded-lg px-3 py-1 cursor-pointer text-xs font-medium border transition
          ${item.styles}
          ${
            active
              ? "shadow-sm ring-1 ring-black/5"
              : "opacity-70 hover:opacity-100"
          }
        `}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredRooms.map((room) => (
          <button
            key={room.id}
            onClick={() => {
              if (room.status === "available") {
                setCurrentModal("BookRoom");
              }
            }}
            className={`relative cursor-pointer rounded-xl border p-4 text-left transition hover:shadow-md
              ${getRoomBg(room.status)}`}
          >
            {/* Status Dot */}
            <span
              className={`absolute right-3 top-3 h-3 w-3 rounded-full ${getDot(
                room.status
              )}`}
            />

            <p className="text-lg font-semibold text-gray-900">
              Room {room.number}
            </p>

            <p className="text-xs text-gray-600">{room.category}</p>

            <p
              className={`mt-2 inline-block rounded-full px-2 py-[2px] text-xs font-medium ${getBadge(
                room.status
              )}`}
            >
              {formatStatus(room.status)}
            </p>
          </button>
        ))}

        {filteredRooms.length === 0 && (
          <p className="col-span-full text-center text-sm text-gray-500">
            No rooms found for selected filters
          </p>
        )}
      </div>
    </div>
  );
}

export default RoomAvailabilityGrid;

/* ---------- Helpers ---------- */

function formatStatus(status: string) {
  return status.replace("_", " ").toUpperCase();
}

function getRoomBg(status: string) {
  switch (status) {
    case "available":
      return "border-green-300 bg-green-50";
    case "booked":
      return "border-blue-300 bg-blue-50";
    case "checked_in":
      return "border-yellow-300 bg-yellow-50";
    case "maintenance":
      return "border-red-300 bg-red-50";
    default:
      return "border-gray-200 bg-white";
  }
}

function getDot(status: string) {
  switch (status) {
    case "available":
      return "bg-green-500";
    case "booked":
      return "bg-blue-500";
    case "checked_in":
      return "bg-yellow-500";
    case "maintenance":
      return "bg-red-500";
    default:
      return "bg-gray-400";
  }
}

function getBadge(status: string) {
  switch (status) {
    case "available":
      return "bg-green-100 text-green-700";
    case "booked":
      return "bg-blue-100 text-blue-700";
    case "checked_in":
      return "bg-yellow-100 text-yellow-700";
    case "maintenance":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}
