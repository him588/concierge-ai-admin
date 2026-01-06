"use client";

import { useState } from "react";

/* ---------- Hard-coded room categories ---------- */
const ROOM_CATEGORIES = [
  { id: "standard", name: "Standard Room" },
  { id: "deluxe", name: "Deluxe Room" },
  { id: "suite", name: "Suite Room" },
  { id: "family", name: "Family Room" },
];

interface BookRoomProps {
  accentColor: string;
  onCancel?: () => void;
}

function BookRoom({ accentColor, onCancel }: BookRoomProps) {
  const [form, setForm] = useState({
    guestName: "",
    phone: "",
    email: "",
    categoryId: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    paymentStatus: "pending",
    bookingStatus: "confirmed",
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <h2
        className="text-xl text-center text-black font-semibold"
        style={{ color: accentColor }}
      >
        Book Room
      </h2>

      {/* Guest Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Guest Name"
          placeholder="John Doe"
          value={form.guestName}
          accentColor={accentColor}
          onChange={(e) => setForm({ ...form, guestName: e.target.value })}
        />

        <Input
          label="Phone Number"
          placeholder="+91 9876543210"
          value={form.phone}
          accentColor={accentColor}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <Input
          label="Email (Optional)"
          type="email"
          placeholder="guest@email.com"
          value={form.email}
          accentColor={accentColor}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      {/* Booking Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Room Category"
          value={form.categoryId}
          accentColor={accentColor}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
        >
          <option value="">Select category</option>
          {ROOM_CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Select>

        <Input
          label="Number of Guests"
          type="number"
          min={1}
          value={form.guests}
          accentColor={accentColor}
          onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
        />

        <Input
          label="Check-in Date"
          type="date"
          value={form.checkIn}
          accentColor={accentColor}
          onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
        />

        <Input
          label="Check-out Date"
          type="date"
          value={form.checkOut}
          accentColor={accentColor}
          onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
        />
      </div>

      {/* Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Payment Status"
          value={form.paymentStatus}
          accentColor={accentColor}
          onChange={(e) => setForm({ ...form, paymentStatus: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </Select>

        <Select
          label="Booking Status"
          value={form.bookingStatus}
          accentColor={accentColor}
          onChange={(e) => setForm({ ...form, bookingStatus: e.target.value })}
        >
          <option value="confirmed">Confirmed</option>
          <option value="checked_in">Checked In</option>
          <option value="checked_out">Checked Out</option>
          <option value="cancelled">Cancelled</option>
        </Select>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          className="btn btn-outline border-gray-300 rounded-[10px]"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="btn text-white rounded-[10px] border-none"
          style={{ backgroundColor: accentColor }}
        >
          Book Room
        </button>
      </div>
    </div>
  );
}

export default BookRoom;

/* ---------- Reusable Components ---------- */

function Input({
  label,
  accentColor,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  accentColor?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        {...props}
        className="input input-bordered bg-white text-black rounded-[10px]
          border-gray-300 focus:outline-none focus:border-transparent
          focus:ring-2 focus:ring-offset-1"
        style={
          accentColor
            ? ({ "--tw-ring-color": accentColor } as React.CSSProperties)
            : undefined
        }
      />
    </div>
  );
}

function Select({
  label,
  accentColor,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  accentColor?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        {...props}
        className="select select-bordered bg-white text-black rounded-[10px]
          border-gray-300 focus:outline-none focus:border-transparent
          focus:ring-2 focus:ring-offset-1"
        style={
          accentColor
            ? ({ "--tw-ring-color": accentColor } as React.CSSProperties)
            : undefined
        }
      >
        {children}
      </select>
    </div>
  );
}
