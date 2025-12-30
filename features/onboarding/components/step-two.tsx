"use client";

import React, { useState } from "react";
import Input from "@/components/common/input";
import { ChevronRight, X } from "lucide-react";
import LocationPicker from "./location-picker";
import { address, coordinates, formType } from "../types/type";
import { useLoadScript } from "@react-google-maps/api";
import AppConfig from "@/components/lib/app-config";

function StepTwo(formOptions: formType) {
  const { setCurrentStep, onboardingForm, setOnboardingForm } = formOptions;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: AppConfig.env.GoogleMapKey!,
    libraries: ["places"],
  });

  const [tempAddress, setTempAddress] = useState<address>(
    onboardingForm.location
  );
  const [tempCoordinates, setTempCoordinates] = useState<coordinates>(
    onboardingForm.coordinates
  );

  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);

  const handleAddressChange =
    (field: keyof address) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setOnboardingForm((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [field]: value,
        },
      }));
    };

  const handleUpdateLocation = () => {
    setOnboardingForm((prev) => ({
      ...prev,
      location: tempAddress,
      coordinates: tempCoordinates,
    }));
    setIsMapOpen(false);
  };

  const geocodeAddress = async (): Promise<boolean> => {
    if (!isLoaded || !window.google?.maps?.Geocoder) {
      alert("Map is still loading. Please try again.");
      return false;
    }

    const geocoder = new google.maps.Geocoder();

    const { streetAddress, city, state, country, pincode } =
      onboardingForm.location;

    const fullAddress = [streetAddress, city, state, country, pincode]
      .filter(Boolean)
      .join(", ");

    const { results } = await geocoder.geocode({ address: fullAddress });
    console.log(results);

    if (!results || results.length === 0) return false;

    const location = results[0].geometry.location;
    console.log(location.lat(), location.lng());

    setOnboardingForm((prev) => ({
      ...prev,
      coordinates: {
        latitude: location.lat(),
        longitude: location.lng(),
      },
    }));

    return true;
  };

  const isLocationValid = () => {
    const { location } = onboardingForm;

    if (!location.streetAddress.trim()) return false;
    if (!location.city.trim()) return false;
    if (!location.state.trim()) return false;
    if (!location.country.trim()) return false;

    return true;
  };

  const handleContinue = async () => {
    const { coordinates } = onboardingForm;

    // Map already selected
    if (coordinates.latitude !== 0 || coordinates.longitude !== 0) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    // Manual address → geocode
    const success = await geocodeAddress();

    if (!success) {
      alert("Please select a valid location on map or enter a correct address");
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="w-[420px] flex flex-col gap-[20px] mt-[40px]">
      <div>
        <Input
          title="Address Line"
          value={onboardingForm.location.streetAddress}
          onChange={handleAddressChange("streetAddress")}
        />

        {onboardingForm.coordinates.latitude === 0 &&
        onboardingForm.coordinates.longitude === 0 ? (
          <p
            onClick={() => setIsMapOpen(true)}
            className="text-sm text-[#1c1d4e] cursor-pointer underline mt-1 w-fit"
          >
            Select on map
          </p>
        ) : (
          <p className="text-xs text-green-600 mt-1">Location selected ✔</p>
        )}
      </div>

      <div className="flex gap-[12px]">
        <Input
          title="City"
          value={onboardingForm.location.city}
          onChange={handleAddressChange("city")}
        />
        <Input
          title="State"
          value={onboardingForm.location.state}
          onChange={handleAddressChange("state")}
        />
      </div>

      <div className="flex gap-[12px]">
        <Input
          title="Country"
          value={onboardingForm.location.country}
          onChange={handleAddressChange("country")}
        />
        <Input
          title="Pincode"
          value={onboardingForm.location.pincode}
          onChange={handleAddressChange("pincode")}
        />
      </div>

      {/* Continue Button */}
      <div className="flex justify-end">
        <button
          disabled={!isLocationValid() || isGeocoding}
          onClick={handleContinue}
          className="mt-[20px] w-[200px] h-[44px] rounded-xl 
          bg-[#1c1d4e] text-white font-medium flex items-center justify-center
          hover:bg-[#15163b] transition gap-[.2rem]
          disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGeocoding ? "Detecting location..." : "Continue"}
          <ChevronRight size={18} />
        </button>
      </div>

      {/* MAP MODAL */}
      {isMapOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl w-[90%] max-w-[500px] p-4">
            <div className="flex justify-between items-center mb-3">
              <p className="font-medium text-[#15163b]">
                Select location on map
              </p>
              <X
                size={20}
                className="cursor-pointer text-[#15163b]"
                onClick={() => setIsMapOpen(false)}
              />
            </div>

            <LocationPicker
              setTempAddress={setTempAddress}
              setTempCoordinates={setTempCoordinates}
            />

            <div className="flex justify-end mt-4">
              <button
                onClick={handleUpdateLocation}
                className="px-5 h-[40px] rounded-lg bg-[#1c1d4e] text-white"
              >
                Confirm location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StepTwo;
