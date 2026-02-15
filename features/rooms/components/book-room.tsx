"use client";

import { useBookRoom, useGetRoomTypes } from "@/components/hooks/use-api";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useMemo, useState } from "react";

dayjs.extend(isSameOrBefore);

interface BookRoomProps {
  accentColor: string;
  onCancel?: () => void;
}

type FormErrors = {
  guestName?: string;
  phone?: string;
  email?: string;
  categoryId?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
};

function BookRoom({ accentColor, onCancel }: BookRoomProps) {
  const { mutate } = useBookRoom();
  const { data } = useGetRoomTypes();

  const roomTypes = useMemo(() => {
    return (
      data?.data?.roomTypes.map((cat: { _id: string; type: string }) => ({
        id: cat._id,
        name: cat.type,
      })) ?? []
    );
  }, [data]);

  // const roomTypes = (data?.data.roomTypes as [RoomCategoryType]) || [];

  const [form, setForm] = useState({
    guestName: "",
    phone: "",
    email: "",
    categoryId: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  /* ---------- Helpers ---------- */
  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  /* ---------- Validation ---------- */
  function validateForm() {
    const newErrors: FormErrors = {};

    if (!form.guestName.trim()) {
      newErrors.guestName = "Guest name is required";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9]{10,15}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.categoryId) {
      newErrors.categoryId = "Please select a room category";
    }

    if (!form.checkIn) {
      newErrors.checkIn = "Check-in date is required";
    }

    if (!form.checkOut) {
      newErrors.checkOut = "Check-out date is required";
    }

    if (form.checkIn && form.checkOut) {
      const checkInDate = dayjs(form.checkIn);
      const checkOutDate = dayjs(form.checkOut);

      if (checkOutDate.isSameOrBefore(checkInDate)) {
        newErrors.checkOut = "Check-out must be after check-in";
      }
    }

    if (form.guests < 1) {
      newErrors.guests = "At least 1 guest is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  /* ---------- Actions ---------- */
  async function handleCheckAvailability() {
    if (!validateForm()) return;
    mutate(form);

    console.log("Valid form:", form);
  }

  console.log(new Date());

  return (
    <div className="space-y-6">
      {/* Title */}
      <h2
        className="text-xl text-black text-center font-semibold"
        style={{ color: accentColor }}
      >
        Book Room
      </h2>

      {/* Guest Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Guest Name"
          value={form.guestName}
          error={errors.guestName}
          accentColor={accentColor}
          onFocus={() => clearError("guestName")}
          onChange={(e) => setForm({ ...form, guestName: e.target.value })}
        />

        <Input
          label="Phone Number"
          value={form.phone}
          error={errors.phone}
          accentColor={accentColor}
          onFocus={() => clearError("phone")}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <Input
          label="Email (Optional)"
          type="email"
          value={form.email}
          error={errors.email}
          accentColor={accentColor}
          onFocus={() => clearError("email")}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      {/* Booking Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Room Category"
          value={form.categoryId}
          error={errors.categoryId}
          accentColor={accentColor}
          onFocus={() => clearError("categoryId")}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
        >
          <option value="">Select category</option>
          {roomTypes.map((cat: { id: string; name: string }) => (
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
          error={errors.guests}
          accentColor={accentColor}
          onFocus={() => clearError("guests")}
          onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
        />

        <Input
          label="Check-in Date"
          type="date"
          value={form.checkIn}
          error={errors.checkIn}
          accentColor={accentColor}
          onFocus={() => clearError("checkIn")}
          onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
        />

        <Input
          label="Check-out Date"
          type="date"
          value={form.checkOut}
          error={errors.checkOut}
          accentColor={accentColor}
          onFocus={() => clearError("checkOut")}
          onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          className="btn text-black hover:text-white hover:bg-black border-gray-300 rounded-[10px]"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          type="button"
          className="btn text-white rounded-[10px] bg-black border-none hover:opacity-80"
          style={{ backgroundColor: accentColor }}
          onClick={handleCheckAvailability}
        >
          Check Availability
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
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  accentColor?: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <input
        {...props}
        className={`input input-bordered bg-white text-black rounded-[10px]
        border-gray-300 focus:outline-none focus:border-transparent
        focus:ring-2 focus:ring-offset-1
        ${error ? "border-red-500" : ""}`}
        style={
          accentColor
            ? ({ "--tw-ring-color": accentColor } as React.CSSProperties)
            : undefined
        }
      />

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

function Select({
  label,
  accentColor,
  error,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  accentColor?: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <select
        {...props}
        className={`select select-bordered bg-white text-black rounded-[10px]
        border-gray-300 focus:outline-none focus:border-transparent
        focus:ring-2 focus:ring-offset-1
        ${error ? "border-red-500" : ""}`}
        style={
          accentColor
            ? ({ "--tw-ring-color": accentColor } as React.CSSProperties)
            : undefined
        }
      >
        {children}
      </select>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
