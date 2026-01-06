/* eslint-disable @next/next/no-img-element */
"use client";

import { Users, IndianRupee } from "lucide-react";

interface RoomCategory {
  id: string;
  type: string;
  price: number;
  maxGuest: number;
  image: string;
  isShared: boolean;
}

interface RoomCategoryListCardProps {
  category: RoomCategory;
  accentColor: string;
  onClick?: () => void;
}

export function RoomCategoryListCard({
  category,
  accentColor,
  onClick,
}: RoomCategoryListCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md"
    >
      <div className="flex gap-4">
        {/* Image */}
        <img
          src={category.image}
          alt={category.type}
          className="h-20 w-24 rounded-lg object-cover"
        />

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex items-start justify-between">
            <h3 className="text-base font-semibold text-gray-900">
              {category.type}
            </h3>

            <span
              className="text-sm font-semibold"
              style={{ color: accentColor }}
            >
              ₹{category.price}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Users size={12} />
              Max {category.maxGuest}
            </div>

            {category.isShared && (
              <span
                className="rounded-full px-2 py-0.5 text-xs font-medium"
                style={{
                  backgroundColor: `${accentColor}20`,
                  color: accentColor,
                }}
              >
                Shared
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
