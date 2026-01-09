"use client";

import React, { useState } from "react";
import { ChevronRight, Upload } from "lucide-react";
import { formType } from "../types/type";
import ServiceProvider from "@/components/api/service-provider";
import { useRouter } from "next/navigation";
import CookieProvider from "@/components/lib/cookie";
import { JWTProvider } from "@/components/lib/jwt-provider";
import { REFRESH_TOKEN } from "@/components/types/const";
import { useBaseContext } from "@/context/base-context";

const AMENITIES = [
  "WiFi",
  "Parking",
  "Swimming Pool",
  "Air Conditioning",
  "Power Backup",
  "Gym",
  "Security",
  "Room Service",
];

function StepThree(formOptions: formType) {
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const MIN_FILES = 3;
  const MAX_FILES = 5;

  const { setCurrentStep, onboardingForm, setOnboardingForm } = formOptions;
  const { setUserDetails, userDetails } = useBaseContext();
  const [images, setImages] = useState<File[]>([]);
  const [imageError, setImageError] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const validFiles: File[] = [];
    let error = "";

    for (const file of selectedFiles) {
      if (!file.type.startsWith("image/")) {
        error = `${file.name} is not an image`;
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        error = `${file.name} is larger than 2MB`;
        continue;
      }

      validFiles.push(file);
    }

    const totalImages = images.length + validFiles.length;

    if (totalImages > MAX_FILES) {
      setImageError(`You can upload maximum ${MAX_FILES} images`);
      return;
    }

    setImages((prev) => [...prev, ...validFiles]);
    setImageError("");
  };

  async function handleContinue() {
    if (images.length < MIN_FILES) {
      setImageError(`Minimum ${MIN_FILES} images are required`);
      return;
    }

    const formdata = new FormData();

    setOnboardingForm((prev) => ({
      ...prev,
      tags: selectedAmenities,
    }));

    formdata.append(
      "userDetails",
      JSON.stringify({ ...onboardingForm, tags: selectedAmenities })
    );

    images.forEach((img) => formdata.append("images", img));

    const response = await ServiceProvider.apiClient?.post(
      "/property/register-property",
      formdata
    );

    console.log(response?.data);

    if (response?.data) {
      CookieProvider.setCookie(REFRESH_TOKEN, response.data.refreshToken, {
        path: "/",
        expires: new Date(Date.now() + 30 * 60 * 1000),
      });

      JWTProvider.setAccessToken(response.data.accessToken);
      router.push("/overview");
      setUserDetails((prev) => {
        if (!prev) return prev;
        const updatedDetails = { ...prev, hotelId: response.data._id };
        return updatedDetails;
      });
    }
  }

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <div className="w-[420px] flex flex-col gap-[24px] mt-[40px]">
      {/* Images Upload */}
      <div>
        <p className="text-[14px] text-[#a7a9a8] mb-1">
          Property Images (Min 3 · Max 5)
        </p>

        <label
          className="flex items-center justify-center gap-2 h-[44px] rounded-lg 
          border border-dashed border-[#1c1d4e] cursor-pointer text-[#1c1d4e]"
        >
          <Upload size={18} />
          Upload Images
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>

        {images.length > 0 && (
          <p className="text-xs text-green-600 mt-1">
            {images.length} / {MAX_FILES} images selected
          </p>
        )}

        {imageError && (
          <p className="text-xs text-red-500 mt-1">{imageError}</p>
        )}
      </div>

      {/* Amenities */}
      <div>
        <p className="text-[14px] text-[#a7a9a8] mb-2">
          Add tags (Helps users for better search)
        </p>

        <div className="flex flex-wrap gap-3">
          {AMENITIES.map((amenity) => {
            const isActive = selectedAmenities.includes(amenity);
            return (
              <button
                key={amenity}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                className={`px-4 py-2 rounded-lg border-[2px] text-sm transition
                ${
                  isActive
                    ? "bg-[#1c1d4e] text-white border-[#1c1d4e]"
                    : "text-[#1c1d4e]/80 bg-[#1c1d4e]/10 border-[#1c1d4e] hover:bg-[#1c1d4e]/20"
                }`}
              >
                {amenity}
              </button>
            );
          })}
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end">
        <button
          disabled={images.length < MIN_FILES}
          onClick={handleContinue}
          className="mt-[20px] w-[200px] h-[44px] rounded-xl 
          bg-[#1c1d4e] text-white font-medium flex items-center justify-center
          hover:bg-[#15163b] transition gap-[.2rem]
          disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default StepThree;
