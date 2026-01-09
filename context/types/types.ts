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
};
