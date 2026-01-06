/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useEffectEvent, useState } from "react";

/* ---------- Hard-coded categories (temporary) ---------- */
const ROOM_CATEGORIES = [
  { id: "deluxe", name: "Deluxe Room" },
  { id: "suite", name: "Suite Room" },
  { id: "standard", name: "Standard Room" },
  { id: "family", name: "Family Room" },
];

interface CreateRoomProps {
  accentColor: string;
  onCancel?: () => void;
}

function CreateRoom({ accentColor, onCancel }: CreateRoomProps) {
  const [form, setForm] = useState({
    roomNumber: "",
    categoryId: "",
    floor: "",
    amenities: "",
    images: [] as File[], // ✅ multiple images
    isAvailable: true,
  });

  const MAX_IMAGES = 6;

  useEffect(() => {
    console.log(form.images);
  }, [form.images]);

  return (
    <div className="space-y-5">
      {/* Title */}
      <h2
        className="text-xl text-black text-center font-semibold"
        style={{ color: accentColor }}
      >
        Create Room
      </h2>

      {/* Room Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Room Number"
          placeholder="101"
          value={form.roomNumber}
          accentColor={accentColor}
          onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
        />

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
          label="Floor"
          placeholder="1"
          value={form.floor}
          accentColor={accentColor}
          onChange={(e) => setForm({ ...form, floor: e.target.value })}
        />
      </div>

      {/* Amenities */}
      <Input
        label="Amenities"
        placeholder="AC, WiFi, Balcony"
        value={form.amenities}
        accentColor={accentColor}
        onChange={(e) => setForm({ ...form, amenities: e.target.value })}
      />

      {/* Room Images */}
      <div className="space-y-2 ">
        <label className="text-sm font-medium text-gray-700">Room Images</label>

        <input
          type="file"
          accept="image/*"
          multiple
          className="file-input file-input-bordered w-full rounded-[10px]"
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            const remaining = MAX_IMAGES - form.images.length;

            if (remaining <= 0) return;

            setForm((prev) => ({
              ...prev,
              images: [...prev.images, ...files.slice(0, remaining)],
            }));
          }}
        />

        <p className="text-xs text-gray-500">
          Upload up to {MAX_IMAGES} images
        </p>
      </div>

      {/* Image Preview */}
      {form.images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {form.images.map((file, index) => {
            const previewUrl = URL.createObjectURL(file);

            return (
              <div
                key={index}
                className="relative rounded-lg overflow-hidden border"
              >
                <img
                  src={previewUrl}
                  alt="Room"
                  className="h-24 w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      images: prev.images.filter((_, i) => i !== index),
                    }))
                  }
                  className="absolute top-1 right-1 rounded-full bg-black/60 px-2 py-1 text-xs text-white hover:bg-black"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Availability */}
      <div className="flex items-center justify-between rounded-[10px] border border-gray-300 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-gray-700">Room Availability</p>
          <p className="text-xs text-gray-500">
            Enable if this room can be booked
          </p>
        </div>

        <input
          type="checkbox"
          className="toggle toggle-md"
          checked={form.isAvailable}
          onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })}
          style={{
            backgroundColor: form.isAvailable ? accentColor : "#f6ecff",
            borderColor: accentColor,
          }}
        />
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
          Create Room
        </button>
      </div>
    </div>
  );
}

export default CreateRoom;

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
