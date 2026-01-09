"use client";

import { useState } from "react";
import Input from "@/components/common/input";
import React from "react";
import { ChevronRight } from "lucide-react";
import { formType, PropertyType } from "../types/type";

function StepOne(formOptions: formType) {
  const { onboardingForm, setOnboardingForm, setCurrentStep } = formOptions;

  const [nameError, setNameError] = useState("");

  const types: { label: string; value: PropertyType }[] = [
    { label: "Hotel", value: PropertyType.Hotel },
    { label: "Villa", value: PropertyType.Villa },
    { label: "Apartment", value: PropertyType.Apartment },
    { label: "Dorm", value: PropertyType.Dorm },
  ];

  const shouldAskPrice =
    onboardingForm.propertyType === PropertyType.Villa ||
    onboardingForm.propertyType === PropertyType.Apartment;

  const handleContinue = () => {
    let hasError = false;

    // Name validation
    if (!onboardingForm.name.trim()) {
      setNameError("Property name is required");
      hasError = true;
    }

    if (hasError) return;

    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="w-[420px] flex flex-col gap-[20px] mt-[40px]">
      {/* Property Name */}
      <Input
        title="Property Name"
        value={onboardingForm.name}
        msg={nameError}
        onFocus={() => setNameError("")}
        onChange={(e) =>
          setOnboardingForm((prev) => ({
            ...prev,
            name: e.target.value,
          }))
        }
      />

      {/* Description */}
      <Input
        title="Description (optional)"
        value={onboardingForm.description}
        onChange={(e) =>
          setOnboardingForm((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
      />

      {/* Property Type */}
      <div>
        <p className="text-[14px] text-[#a7a9a8]">Property Type</p>

        <div className="flex flex-wrap gap-3 mt-[5px]">
          {types.map((type) => {
            const isActive = onboardingForm.propertyType === type.value;

            return (
              <button
                key={type.value}
                type="button"
                onClick={() => {
                  setOnboardingForm((prev) => ({
                    ...prev,
                    propertyType: type.value,
                  }));
                }}
                className={`px-4 py-2 rounded-lg cursor-pointer border-[2px] text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-[#1c1d4e] text-white border-[#1c1d4e]"
                      : "text-[#1c1d4e]/80 bg-[#1c1d4e]/10 border-[#1c1d4e] hover:bg-[#1c1d4e]/20"
                  }`}
              >
                {type.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Continue */}
      <div className="flex justify-end">
        <button
          onClick={handleContinue}
          className="mt-[20px] w-[200px] h-[44px] rounded-xl 
          bg-[#1c1d4e] text-white font-medium flex items-center justify-center
          hover:bg-[#15163b] transition gap-[.2rem] cursor-pointer"
        >
          Continue
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default StepOne;
