export const weekData = [
  {
    id: "Bookings",
    data: [
      { x: "Mon", y: 20 },
      { x: "Tue", y: 35 },
      { x: "Wed", y: 40 },
      { x: "Thu", y: 30 },
      { x: "Fri", y: 50 },
      { x: "Sat", y: 60 },
      { x: "Sun", y: 45 },
    ],
  },
];

export const monthData = [
  {
    id: "Bookings",
    data: Array.from({ length: 30 }, (_, i) => ({
      x: `${i + 1}`,
      y: Math.floor(Math.random() * 80),
    })),
  },
];

export const yearData = [
  {
    id: "Bookings",
    data: [
      { x: "Jan", y: 120 },
      { x: "Feb", y: 90 },
      { x: "Mar", y: 140 },
      { x: "Apr", y: 110 },
      { x: "May", y: 160 },
      { x: "Jun", y: 130 },
      { x: "Jul", y: 170 },
      { x: "Aug", y: 150 },
      { x: "Sep", y: 140 },
      { x: "Oct", y: 180 },
      { x: "Nov", y: 165 },
      { x: "Dec", y: 190 },
    ],
  },
];
