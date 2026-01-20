import React from "react";

export type UserDetails = {
  name: string;
  email: string;
  role?: string;
  userId: string;
  hotelId?: string;
};

export type BaseContextType = {
  userDetails: UserDetails | undefined;
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetails | undefined>>;
  alert: string;
  setAlert: React.Dispatch<React.SetStateAction<string>>;
};

export type ServiceContextType = {
  activeTab: "Services" | "Staff";
  setActiveTab: React.Dispatch<React.SetStateAction<"Services" | "Staff">>;
};
