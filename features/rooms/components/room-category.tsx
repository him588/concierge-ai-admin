import { BedDouble } from "lucide-react";
import React from "react";
import room from "../room";
import EmptyState from "./empty-state";
import { RoomCategoryListCard } from "./category-card";

function RoomCategory() {
  const roomCategories = [
    {
      id: "1",
      type: "Standard",
      price: 2500,
      maxGuest: 2,
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&auto=format&fit=crop&q=60",
      isShared: false,
    },
    {
      id: "2",
      type: "Deluxe",
      price: 4000,
      maxGuest: 3,
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&auto=format&fit=crop&q=60",
      isShared: false,
    },
    {
      id: "3",
      type: "Suite",
      price: 6500,
      maxGuest: 4,
      image:
        "https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?w=600&auto=format&fit=crop&q=60",
      isShared: false,
    },
    {
      id: "4",
      type: "Shared Dorm",
      price: 1200,
      maxGuest: 6,
      image:
        "https://images.unsplash.com/photo-1610123172763-1f587473048f?w=600&auto=format&fit=crop&q=60",
      isShared: true,
    },
    {
      id: "5",
      type: "Luxury Suite",
      price: 9000,
      maxGuest: 5,
      image:
        "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=600&auto=format&fit=crop&q=60",
      isShared: false,
    },
  ];

  return (
    <>
      <h2 className="mb-4 text-lg font-semibold text-[#1c1d4e]">Rooms</h2>

      {roomCategories.length === 0 ? (
        <EmptyState
          title="No rooms created"
          description="Add rooms to start managing bookings"
          icon={BedDouble}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {roomCategories.map((category) => (
            <RoomCategoryListCard
              key={category.id}
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
