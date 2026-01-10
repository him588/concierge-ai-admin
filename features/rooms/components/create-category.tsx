/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useCreateRoomType } from "@/components/hooks/use-room-type";
import { useBaseContext } from "@/context/base-context";

interface CreateCategoryProps {
  accentColor: string;
  onCancel?: () => void;
}

const IMAGE_OPTIONS = [
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1610123172763-1f587473048f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
];

function CreateCategory({ accentColor, onCancel }: CreateCategoryProps) {
  const [form, setForm] = useState({
    type: "",
    price: "",
    maxGuest: "",
    image: "",
    tags: "",
    isShared: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { userDetails } = useBaseContext();

  const {
    mutate: createRoomType,
    isError,
    isPending,
    isSuccess,
  } = useCreateRoomType();

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        onCancel?.();
      }, 800); // smooth UX, user sees success screen

      return () => clearTimeout(timer);
    }
  }, [isSuccess, onCancel]);

  /* ---------------- VALIDATION ---------------- */

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.type.trim()) newErrors.type = "Required";
    if (!form.price || isNaN(+form.price) || +form.price <= 0)
      newErrors.price = "Invalid price";
    if (!form.maxGuest || isNaN(+form.maxGuest) || +form.maxGuest < 1)
      newErrors.maxGuest = "Invalid number";
    if (!form.image) newErrors.image = "Select an image";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = () => {
    if (!validateForm()) return;

    const payload = {
      type: form.type.trim(),
      price: Number(form.price),
      maxGuest: Number(form.maxGuest),
      image: form.image,
      isShared: form.isShared,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    console.log("VALID PAYLOAD →", payload);
    if (userDetails?.hotelId) {
      const response = createRoomType(payload);
      console.log(response);
    }
  };

  return (
    <div className="space-y-6">
      {!isSuccess ? (
        <>
          {/* Title */}
          <h2
            className="text-xl text-center text-black font-semibold"
            style={{ color: accentColor }}
          >
            Create Room Category
          </h2>

          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Input
                label="Category Name"
                placeholder="Deluxe, Suite..."
                value={form.type}
                accentColor={accentColor}
                onChange={(e) => {
                  setForm({ ...form, type: e.target.value });
                  setErrors({ ...errors, type: "" });
                }}
              />
              {errors.type && (
                <p className="mt-1 text-xs text-red-500">{errors.type}</p>
              )}
            </div>

            <div>
              <Input
                label="Price per Night"
                placeholder="4000"
                value={form.price}
                accentColor={accentColor}
                onChange={(e) => {
                  setForm({ ...form, price: e.target.value });
                  setErrors({ ...errors, price: "" });
                }}
              />
              {errors.price && (
                <p className="mt-1 text-xs text-red-500">{errors.price}</p>
              )}
            </div>

            <div>
              <Input
                label="Max Guests"
                placeholder="2"
                value={form.maxGuest}
                accentColor={accentColor}
                onChange={(e) => {
                  setForm({ ...form, maxGuest: e.target.value });
                  setErrors({ ...errors, maxGuest: "" });
                }}
              />
              {errors.maxGuest && (
                <p className="mt-1 text-xs text-red-500">{errors.maxGuest}</p>
              )}
            </div>
          </div>

          {/* Shared toggle */}
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
                    onClick={() => {
                      setForm({ ...form, image: img });
                      setErrors({ ...errors, image: "" });
                    }}
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

            {errors.image && (
              <p className="text-xs text-red-500">{errors.image}</p>
            )}
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
              type="button"
              onClick={handleSubmit}
              // disabled={isPending}
              className={`btn text-white rounded-[10px] border-none hover:opacity-90 `}
              style={{ backgroundColor: accentColor }}
            >
              {isPending ? (
                <span className="loading loading-spinner loading-lg "></span>
              ) : (
                ""
              )}
              {/* <span className="loading loading-spinner loading-lg "></span> */}
              Create Category
            </button>
          </div>
        </>
      ) : (
        <>
          <img
            alt=""
            src={
              "https://cdn.dribbble.com/userupload/45210442/file/93c8f2d6e3e3ce159763696ab94803e2.jpg?resize=1600x1200&vertical=center"
            }
          />
          <p className=" text-center text-xl text-[#fe69b5] font-semibold -mt-[15px]">
            Room Created SuccessFully
          </p>
        </>
      )}
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
