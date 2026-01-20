/* eslint-disable @next/next/no-img-element */
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Users, Layers, Wrench } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

interface Room {
  id: string;
  roomNumber: string;
  category: string;
  floor: string;
  images: string[];
  maxGuest: number;
  status: "available" | "booked" | "maintenance";
}

interface RoomCardProps {
  room: Room;
  accentColor: string;
  onClick?: () => void;
  onToggleMaintenance?: (roomId: string, value: boolean) => void;
}

export function RoomCard({
  room,
  accentColor,
  onClick,
  onToggleMaintenance,
}: RoomCardProps) {
  const status =
    room.status === "maintenance"
      ? "maintenance"
      : room.status === "available"
      ? "available"
      : "unavailable";

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition  "
    >
      {/* Image Swiper */}
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
        // pagination={{ clickable: true }}
        className="h-48 w-full rounded-[15px] "
      >
        {room.images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Room ${room.roomNumber}`}
              className="h-48 w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Room {room.roomNumber}
          </h3>

          <div className=" flex gap-[1rem]">
            <div>
              {status === "maintenance" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                  <Wrench size={12} />
                  Under Mainten..
                </span>
              )}

              {status === "available" && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  Available
                </span>
              )}

              {status === "unavailable" && (
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                  Unavailable
                </span>
              )}
            </div>
            <div
              className="tooltip tooltip-top "
              data-tip="Mark room as under maintenance"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="checkbox"
                className="toggle toggle-bg-green-500 toggle-error toggle-md shadow-lg
               bg-green-100 checked:bg-red-100   text-green-400 checked:text-red-500   "
                onChange={(e) => {
                  e.stopPropagation();
                  onToggleMaintenance?.(room.id, e.target.checked);
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Layers size={14} />
            Floor {room.floor}
          </div>

          <div className="flex items-center gap-1">
            <Users size={14} />
            Max {room.maxGuest}
          </div>
        </div>

        <p className="text-sm font-medium" style={{ color: accentColor }}>
          {room.category}
        </p>
      </div>
    </div>
  );
}
