import React, { SetStateAction } from "react";

export enum PropertyType {
  Hotel = "Hotel",
  Villa = "Villa",
  Apartment = "Apartment",
  Dorm = "Dorm",
}

export type address = {
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
};

export type coordinates = {
  latitude: number;
  longitude: number;
};

export type onboardingForm = {
  name: string;
  description: string;
  propertyType: PropertyType;
  location: address;
  coordinates: coordinates;
  tags: string[];
  price?: number;
};

export type formType = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  onboardingForm: onboardingForm;
  setOnboardingForm: React.Dispatch<SetStateAction<onboardingForm>>;
};
