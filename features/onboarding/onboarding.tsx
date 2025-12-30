"use client";
import { useState } from "react";
import ProgressBar from "./components/progress-bar";
import StepOne from "./components/step-one";
import StepTwo from "./components/step-two";
import StepThree from "./components/step-three";
import { onboardingForm, PropertyType } from "./types/type";

function Onboarding() {
  const [currrentStep, setCurrentStep] = useState(1);
  const [onboardingForm, setOnboardingForm] = useState<onboardingForm>({
    name: "",
    description: "",
    propertyType: PropertyType.Hotel,
    location: {
      streetAddress: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
    tags: [],
  });
  return (
    <div className="h-full w-full   flex flex-col   py-[2rem] px-[8rem] ">
      <p className="text-[35px] text-[#1c1d4e] font-semibold">
        Last step to forward
      </p>
      <p className="text-[#a7a9a8]  text-[14px] tracking-wider">
        Complete onboarding to see your stats
      </p>
      <ProgressBar currentStep={currrentStep} />
      {currrentStep === 1 && (
        <StepOne
          currentStep={currrentStep}
          setCurrentStep={setCurrentStep}
          onboardingForm={onboardingForm}
          setOnboardingForm={setOnboardingForm}
        />
      )}
      {currrentStep === 2 && (
        <StepTwo
          currentStep={currrentStep}
          setCurrentStep={setCurrentStep}
          onboardingForm={onboardingForm}
          setOnboardingForm={setOnboardingForm}
        />
      )}
      {currrentStep === 3 && (
        <StepThree
          currentStep={currrentStep}
          setCurrentStep={setCurrentStep}
          onboardingForm={onboardingForm}
          setOnboardingForm={setOnboardingForm}
        />
      )}
    </div>
  );
}

export default Onboarding;
