/* eslint-disable @next/next/no-img-element */
"use client";

import { useCreateRoom, useGetRoomTypes } from "@/components/hooks/use-api";
import { RoomCategoryType } from "@/components/types/types";
import { useBaseContext } from "@/context/base-context";
import { AxiosError } from "axios";
import { useMemo, useState } from "react";

interface CreateRoomProps {
  accentColor: string;
  onCancel?: () => void;
}

interface RoomCategory {
  id: string;
  name: string;
}

function CreateRoom({ accentColor, onCancel }: CreateRoomProps) {
  const { data } = useGetRoomTypes();
  const { mutate: createRoom, isPending, isSuccess } = useCreateRoom();
  const { setAlert } = useBaseContext();

  const [form, setForm] = useState({
    roomNumber: "",
    categoryId: "",
    floor: "",
    amenities: "",
    images: [] as File[],
    isAvailable: true,
  });

  const [errors, setErrors] = useState<{
    roomNumber?: string;
    categoryId?: string;
    floor?: string;
    amenities?: string;
    images?: string;
  }>({});

  const MAX_IMAGES = 6;

  const roomCategories: RoomCategory[] = useMemo(() => {
    return (
      data?.data?.roomTypes?.map((room: RoomCategoryType) => ({
        id: room._id,
        name: `${room.type} Room`,
      })) || []
    );
  }, [data]);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!form.roomNumber.trim())
      newErrors.roomNumber = "Room number is required";
    if (!form.categoryId) newErrors.categoryId = "Room category is required";
    if (!form.floor.trim()) newErrors.floor = "Floor is required";
    else if (isNaN(Number(form.floor)))
      newErrors.floor = "Floor must be a number";
    if (!form.amenities.trim()) newErrors.amenities = "Amenities are required";
    if (form.images.length === 0)
      newErrors.images = "At least one image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const formData = new FormData();

    formData.append("roomNumber", form.roomNumber);
    formData.append("categoryId", form.categoryId);
    formData.append("floor", form.floor);
    formData.append("amenities", form.amenities);
    formData.append("isAvailable", String(form.isAvailable));
    formData.append("status", form.isAvailable ? "available" : "maintenance");

    form.images.forEach((file) => {
      formData.append("images", file);
    });

    createRoom(formData, {
      onSuccess: () => {
        setForm({
          roomNumber: "",
          categoryId: "",
          floor: "",
          amenities: "",
          images: [],
          isAvailable: true,
        });
        setErrors({});
        setTimeout(() => {
          onCancel?.();
        }, 3000);
      },
      onError: (error: unknown) => {
        console.error("Create room failed", error);
        const apiError = (error as AxiosError<{ message: string }>)?.response
          ?.data;
        console.log(apiError);
        if (apiError) {
          setAlert(apiError?.message);
          onCancel?.();
          setTimeout(() => {
            setAlert("");
          }, 3000);
        }
      },
    });
  };

  const clearError = (field: keyof typeof errors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="space-y-5">
      {!isSuccess ? (
        <>
          <h2
            className="text-xl text-black text-center font-semibold"
            style={{ color: accentColor }}
          >
            Create Room
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Input
                label="Room Number"
                placeholder="101"
                value={form.roomNumber}
                accentColor={accentColor}
                onFocus={() => clearError("roomNumber")}
                onChange={(e) =>
                  setForm({ ...form, roomNumber: e.target.value })
                }
              />
              {errors.roomNumber && (
                <p className="text-xs text-red-500">{errors.roomNumber}</p>
              )}
            </div>

            <div>
              <Select
                label="Room Category"
                value={form.categoryId}
                accentColor={accentColor}
                onFocus={() => clearError("categoryId")}
                onChange={(e) =>
                  setForm({ ...form, categoryId: e.target.value })
                }
              >
                <option value="">Select category</option>
                {roomCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Select>
              {errors.categoryId && (
                <p className="text-xs text-red-500">{errors.categoryId}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Input
                label="Floor"
                placeholder="1"
                value={form.floor}
                accentColor={accentColor}
                onFocus={() => clearError("floor")}
                onChange={(e) => setForm({ ...form, floor: e.target.value })}
              />
              {errors.floor && (
                <p className="text-xs text-red-500">{errors.floor}</p>
              )}
            </div>

            <div>
              <Input
                label="Amenities"
                placeholder="AC, WiFi, Balcony"
                value={form.amenities}
                accentColor={accentColor}
                onFocus={() => clearError("amenities")}
                onChange={(e) =>
                  setForm({ ...form, amenities: e.target.value })
                }
              />
              {errors.amenities && (
                <p className="text-xs text-red-500">{errors.amenities}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Room Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="file-input file-input-neutral text-black w-full rounded-[10px]"
              onFocus={() => clearError("images")}
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
            {errors.images && (
              <p className="text-xs text-red-500">{errors.images}</p>
            )}
          </div>

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
              <p className="text-sm font-medium text-gray-700">
                Room Availability
              </p>
              <p className="text-xs text-gray-500">
                Enable if this room can be booked
              </p>
            </div>

            <input
              type="checkbox"
              className="toggle toggle-md"
              checked={form.isAvailable}
              onChange={(e) =>
                setForm({ ...form, isAvailable: e.target.checked })
              }
              style={{
                backgroundColor: form.isAvailable ? accentColor : "#f6ecff",
                borderColor: accentColor,
              }}
            />
          </div>

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
              disabled={isPending}
              className="btn text-white bg-black hover:opacity-80 rounded-[10px] border-none"
              style={{ backgroundColor: accentColor }}
              onClick={handleSubmit}
            >
              Create Room
            </button>
          </div>
        </>
      ) : (
        <>
          <img alt="" src="/success.webp" />
          <p className="text-center text-xl text-[#fe69b5] font-semibold -mt-[15px]">
            Room Created SuccessFully
          </p>
        </>
      )}
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
