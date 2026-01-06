/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Check } from "lucide-react";

interface CreateCategoryProps {
  accentColor: string;
  onCancel?: () => void;
}

const IMAGE_OPTIONS = [
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fHJvb218ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJvb218ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHJvb218ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1610123172763-1f587473048f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHJvb218ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHJvb218ZW58MHx8MHx8fDA%3D",
];

function CreateCategory({ accentColor, onCancel }: CreateCategoryProps) {
  const [form, setForm] = useState({
    type: "",
    price: "",
    maxGuest: "",
    image: "",
    tags: "",
    isShared: false, // ✅ new field
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <h2
        className="text-xl text-center text-black font-semibold"
        style={{ color: accentColor }}
      >
        Create Room Category
      </h2>

      {/* Form Fields */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Category Name"
          placeholder="Deluxe, Suite..."
          value={form.type}
          accentColor={accentColor}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        />

        <Input
          label="Price per Night"
          type="text"
          placeholder="4000"
          value={form.price}
          accentColor={accentColor}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <Input
          label="Max Guests"
          type="text"
          placeholder="2"
          value={form.maxGuest}
          accentColor={accentColor}
          onChange={(e) => setForm({ ...form, maxGuest: e.target.value })}
        />
      </div>

      {/* Is Shared Toggle */}
      <div className="flex items-center justify-between rounded-[10px] border border-gray-300 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-gray-700">Shared Room</p>
          <p className="text-xs text-gray-500">
            Enable if this room is shared with other guests
          </p>
        </div>

        <input
          type="checkbox"
          className="toggle toggle-md shadow-md"
          checked={form.isShared}
          onChange={(e) => setForm({ ...form, isShared: e.target.checked })}
          style={{
            backgroundColor: form.isShared ? "#16a34a" : "#ecfdf5",
            borderColor: accentColor,
          }}
        />
      </div>

      {/* Image Picker */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Select Room Image
        </label>

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {IMAGE_OPTIONS.map((img) => {
            const isSelected = form.image === img;

            return (
              <button
                key={img}
                type="button"
                onClick={() => setForm({ ...form, image: img })}
                className={`relative rounded-lg overflow-hidden border-2 transition
                  ${
                    isSelected
                      ? "border-transparent"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                style={
                  isSelected
                    ? { boxShadow: `0 0 0 2px ${accentColor}` }
                    : undefined
                }
              >
                <img
                  src={img}
                  alt="Room"
                  className="h-20 w-full object-cover"
                />

                {isSelected && (
                  <span
                    className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: accentColor }}
                  >
                    <Check size={14} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tags */}
      <Input
        label="Tags"
        placeholder="AC, Balcony, Sea View"
        value={form.tags}
        accentColor={accentColor}
        onChange={(e) => setForm({ ...form, tags: e.target.value })}
      />

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          className="btn btn-outline border-gray-300 rounded-[10px] text-gray-700 hover:bg-gray-100"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="btn text-white rounded-[10px] border-none hover:opacity-90"
          style={{ backgroundColor: accentColor }}
        >
          Create Category
        </button>
      </div>
    </div>
  );
}

export default CreateCategory;

/* ---------- Reusable Input ---------- */

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
          border-gray-300
          focus:outline-none
          focus:border-transparent
          focus:ring-2
          focus:ring-offset-1"
        style={
          accentColor
            ? ({ "--tw-ring-color": accentColor } as React.CSSProperties)
            : undefined
        }
      />
    </div>
  );
}
