"use client";

interface TimelineItem {
  id: string;
  action: "booked" | "checked_in" | "checked_out" | "blocked" | "available";
  message: string;
  user: string;
  timestamp: string;
}

const MOCK_TIMELINE: TimelineItem[] = [
  {
    id: "1",
    action: "booked",
    message: "Room booked for Deluxe category",
    user: "Reception",
    timestamp: "2026-01-05 10:15 AM",
  },
  {
    id: "2",
    action: "checked_in",
    message: "Guest checked in",
    user: "Front Desk",
    timestamp: "2026-01-05 01:00 PM",
  },
  {
    id: "3",
    action: "checked_out",
    message: "Guest checked out",
    user: "Front Desk",
    timestamp: "2026-01-06 11:30 AM",
  },
  {
    id: "4",
    action: "available",
    message: "Room marked available",
    user: "System",
    timestamp: "2026-01-06 11:35 AM",
  },
];

function RoomAvailabilityTimeline() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Room Availability Activity
      </h3>

      <div className="space-y-4">
        {MOCK_TIMELINE.map((item, index) => (
          <div key={item.id} className="flex gap-3">
            {/* Timeline Indicator */}
            <div className="flex flex-col items-center">
              <span
                className={`h-3 w-3 rounded-full ${getDotColor(item.action)}`}
              />
              {index !== MOCK_TIMELINE.length - 1 && (
                <span className="h-full w-[2px] bg-gray-200" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-md px-2 py-[2px] text-xs font-medium ${getBadgeColor(
                    item.action
                  )}`}
                >
                  {formatAction(item.action)}
                </span>
                <span className="text-xs text-gray-500">{item.timestamp}</span>
              </div>

              <p className="mt-1 text-sm text-gray-800">{item.message}</p>

              <p className="text-xs text-gray-500">by {item.user}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomAvailabilityTimeline;

/* ---------- Helpers ---------- */

function formatAction(action: string) {
  return action.replace("_", " ").toUpperCase();
}

function getDotColor(action: string) {
  switch (action) {
    case "booked":
      return "bg-blue-500";
    case "checked_in":
      return "bg-green-500";
    case "checked_out":
      return "bg-yellow-500";
    case "blocked":
      return "bg-red-500";
    case "available":
      return "bg-gray-400";
    default:
      return "bg-gray-300";
  }
}

function getBadgeColor(action: string) {
  switch (action) {
    case "booked":
      return "bg-blue-100 text-blue-700";
    case "checked_in":
      return "bg-green-100 text-green-700";
    case "checked_out":
      return "bg-yellow-100 text-yellow-700";
    case "blocked":
      return "bg-red-100 text-red-700";
    case "available":
      return "bg-gray-100 text-gray-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
}
